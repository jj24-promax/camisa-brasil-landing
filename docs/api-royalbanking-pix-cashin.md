# Royal Banking — Pix Cash In (depósito)

Integração de **solicitação de depósito** via API Pix (Cash In).

> **Segurança:** nunca commites `api-key` real. Usa variáveis de ambiente no servidor.

## Endpoint

| Item        | Valor |
|------------|--------|
| **URL**    | `https://api.royalbanking.com.br/v1/gateway/` |
| **Método** | `POST` |
| **Corpo**  | JSON (`Content-Type: application/json`) |

## Parâmetros obrigatórios

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `api-key` | string | Sim | Chave de API fornecida pela Royal Banking. |
| `amount` | number | Sim | Valor em **reais** (ex.: `100` = R$ 100,00). |
| `client.name` | string | Sim | Nome completo do cliente. |
| `client.document` | string | Sim | CPF **somente dígitos** (ex.: `12345678911`). |
| `client.telefone` | string | Sim | Telefone **somente dígitos** (ex.: `11999999999`). |
| `client.email` | string | Sim | E-mail do cliente. |
| `callbackUrl` | string | Sim | URL do **webhook** para notificações de status do pagamento. |

## Parâmetros opcionais

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `split.email` | string | Não | Usuário do split (ex.: `@teste123`). |
| `split.percentage` | string | Não | Percentual de divisão (ex.: `"10"` = 10%). |

## Exemplo de requisição

```http
POST /v1/gateway/ HTTP/1.1
Host: api.royalbanking.com.br
Content-Type: application/json
```

```json
{
  "api-key": "<SUA_API_KEY>",
  "amount": 100,
  "client": {
    "name": "Maria Oliveira",
    "document": "12345678911",
    "telefone": "11999999999",
    "email": "maria.oliveira@email.com"
  },
  "split": {
    "email": "@Teste002",
    "percentage": "50"
  },
  "callbackUrl": "https://exemplo.com/royalbanking/callback"
}
```

## Resposta de sucesso (200 OK)

```json
{
  "status": "success",
  "message": "ok",
  "paymentCode": "00020101021226790014br.gov.bcb.pix2554...",
  "idTransaction": "52fc5262-4063-4900-933b-55e69850",
  "paymentCodeBase64": "iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQAAAACgl2eQAAACwElEQVR4Xu2XS5IjIQwF4SJw/1vMUeAi..."
}
```

| Campo | Descrição |
|-------|-----------|
| `paymentCode` | Payload EMV / copia-e-cola do Pix. |
| `idTransaction` | Identificador da transação no gateway. |
| `paymentCodeBase64` | QR Code em imagem (Base64), quando aplicável. |

## Códigos HTTP (referência)

| Código | Uso típico |
|--------|------------|
| **200** | Pix gerado com sucesso. |
| **400** | Dados inválidos: campos obrigatórios ausentes ou valores fora do permitido. |
| **401** | Não autorizado: `api-key` inválida ou IP não autorizado. |
| **405** | Método não permitido (esperado `POST`). *Na documentação original constava 200 — convém confirmar com o suporte Royal Banking.* |
| **500** | Erro interno no processamento. |

## Webhook (`callbackUrl`)

O projeto expõe `POST /api/webhooks/royalbanking/pix`. Quando o payload é interpretado como **pago** (`src/lib/royalbanking-webhook-parse.ts`), grava-se `status = paid` na tabela `pix_gateway_payments` (Supabase, **service role**). O checkout consulta `GET /api/pix/payment-status` até o botão “Continuar” ser libertado.

1. Na Vercel: `SUPABASE_SERVICE_ROLE_KEY` + SQL em `docs/supabase-pix-payments.sql`.
2. Se o webhook da Royal Banking tiver outro formato, ajuste `parseRoyalBankingPixWebhook` para detetar `idTransaction` e estado pago.

Documentar assinatura/HMAC e retries conforme manual Royal Banking — este ficheiro cobre o **Cash In** síncrono e o fluxo acima.

## Onde colocar a API Key (este projeto Next.js)

1. **Não** coloques a chave no código nem em `NEXT_PUBLIC_*` (isso ia para o browser).
2. Cria **`camisa-brasil-landing/.env.local`** (já está no `.gitignore`) a partir de **`.env.example`**:
   - `ROYALBANKING_API_KEY` — chave que a Royal Banking te deu.
   - `ROYALBANKING_PIX_CALLBACK_URL` — URL **pública HTTPS** do teu webhook, por exemplo:
     `https://seudominio.com/api/webhooks/royalbanking/pix`  
     Em desenvolvimento local o gateway não consegue chamar `localhost`; usa **túnel** (ngrok, Cloudflare Tunnel, etc.) ou testa webhook só em staging/produção.
3. O checkout (ou qualquer componente cliente) chama **`POST /api/pix/create`** com `amount` e `client` — a **Route Handler** em `src/app/api/pix/create/route.ts` lê a chave do ambiente, monta o `callbackUrl` e fala com `https://api.royalbanking.com.br/v1/gateway/`.
4. A resposta devolve ao browser o JSON do gateway (`paymentCode`, `paymentCodeBase64`, `idTransaction`, …) **sem** expor a `api-key`.

## Notas de implementação (checkout)

- Chamar a API **apenas no servidor** (Route Handler, server action ou backend próprio): evita expor `api-key` no browser.
- Validar CPF, e-mail e telefone antes de enviar.
- Guardar `idTransaction` associado ao pedido para conciliar com o webhook.
