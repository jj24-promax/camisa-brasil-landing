# Royal Banking — Pix Cash Out (saque)

Integração de **saque via Pix** (Pix de saída).

> **Segurança:** Cash out é sensível. Executar **apenas no servidor**, nunca no browser. Não commitar credenciais.

## Endpoint

| Item        | Valor |
|------------|--------|
| **URL**    | `https://api.royalbanking.com.br/c1/cashout/` |
| **Método** | `POST` |
| **Corpo**  | JSON (`Content-Type: application/json`) |
| **Auth**   | **Basic Auth** (conforme manual Royal Banking) + validação de **IP** autorizado |

### Cabeçalhos

| Cabeçalho | Valor |
|-----------|--------|
| `Content-Type` | `application/json` |
| `Authorization` | `Basic <base64>` — credenciais conforme contrato Royal Banking (ex.: usuário + senha ou token no par `user:password`). |

A documentação original indica autenticação por **API Key em Basic Auth** e ainda o campo **`api-key`** no JSON; confirma com o suporte se ambos são obrigatórios ou se um substitui o outro.

## Parâmetros do body (JSON)

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `api-key` | string | Sim | Chave de API do usuário (alinhada ao que a Royal Banking espera no corpo). |
| `amount` | number | Sim | Valor do saque em **reais** (ex.: `410.95`). |
| `keypix` | string | Sim | Chave Pix de destino (CPF, e-mail, telefone ou chave aleatória, conforme tipo). |
| `pixType` | string | Sim | Tipo da chave: ex. `CPF`, `E-MAIL`, `TELEFONE`, `ALEATORIA` (confirmar capitalização exata na API). |
| `name` | string | Sim | Nome completo do beneficiário. |
| `cpf` | string | Sim | CPF do beneficiário **somente dígitos**. |
| `postbackUrl` | string | Sim | URL do **webhook** com o status do saque. |

## Exemplo de requisição

```http
POST /c1/cashout/ HTTP/1.1
Host: api.royalbanking.com.br
Content-Type: application/json
Authorization: Basic <BASE64_CREDENCIAL_BASIC_AUTH>
```

```json
{
  "api-key": "YWRtX25ldG86cGFzc3dvcmQ=",
  "amount": 410.95,
  "keypix": "33456787698",
  "pixType": "CPF",
  "name": "Adm Neto",
  "cpf": "33456787698",
  "postbackUrl": "https://exemplo.com/royalbanking/cashout-webhook"
}
```

> O valor de exemplo em `api-key` parece Base64; trata como **placeholder** e substitui por credenciais reais fornecidas pela Royal Banking.

## Respostas

### Sucesso — 200 OK

JSON com dados da transação e **saldo atualizado** (estrutura exata conforme resposta real da API / manual oficial).

### Erros (referência)

| Código | Situação |
|--------|-----------|
| **401** | API Key não fornecida — cabeçalho de autenticação ausente ou inválido. |
| **401** | IP não autorizado — IP de origem fora da lista permitida. |
| **422** | Dados inválidos — campos obrigatórios em falta ou formato incorreto. |
| **500** | Erro interno no processamento. |

## Comportamento descrito pela Royal Banking

- Autenticação por **API Key** via **Basic Auth**.
- **Validação de IP** autorizado.
- **Taxas** e **saldo líquido** calculados antes de confirmar o saque (detalhes no manual / resposta 200).

## Webhook (`postbackUrl`)

Documentar à parte: payload, assinatura, estados do saque (pendente, pago, falhou, etc.) e idempotência, conforme manual.

## Notas de implementação

- Chamar só a partir de **backend** com IP fixo na allowlist da Royal Banking, se aplicável.
- Validar `amount`, CPF e coerência `keypix` / `pixType` antes do `POST`.
- Registar **id de transação** devolvido no 200 para auditoria e conciliação com o postback.
