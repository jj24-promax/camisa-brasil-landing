# Royal Banking — Pix falhou / cancelado

Indica que o **pagamento Pix foi cancelado** ou **não foi concluído**.

> Exemplo típico de **retorno** em webhook/postback ou resposta de consulta. Confirmar campos adicionais no manual Royal Banking.

## Exemplo de retorno (JSON)

```json
{
  "status": "canceled",
  "message": "Pagamento cancelado ou não concluído"
}
```

## Campos

| Campo | Descrição |
|-------|-----------|
| `status` | Estado do pagamento Pix (ex.: `canceled`). |
| `message` | Motivo do cancelamento ou da falha no pagamento. |

## Notas de implementação

- Atualizar o pedido interno para estado **cancelado / falhou** e libertar estoque ou reserva conforme a tua regra de negócio.
- Tratar o webhook com **idempotência**.
- Não expor mensagens brutas ao utilizador final sem filtrar (podem conter detalhes internos).

## Ver também

- `docs/api-royalbanking-pix-cashin.md` — `callbackUrl` (Cash In).
- `docs/api-royalbanking-pix-med.md` — MED Pix (`refund_approved`).
