# Royal Banking — MED Pix (Mecanismo Especial de Devolução)

O **MED Pix** indica que uma transação Pix foi **analisada** e a **devolução foi aprovada** no âmbito do mecanismo especial de devolução (MED) do arranjo Pix.

> Este conteúdo descreve um **exemplo de retorno** (ex.: corpo de **webhook**, **postback** ou resposta de consulta). Não é o contrato completo da API — valida com o manual Royal Banking e com o BACEN sobre MED.

## Exemplo de retorno (JSON)

```json
{
  "status": "refund_approved",
  "reason": "pix_med"
}
```

## Campos

| Campo | Descrição |
|-------|-----------|
| `status` | Estado da solicitação de MED (ex.: `refund_approved` — devolução aprovada). |
| `reason` | Motivo associado à devolução via MED Pix (ex.: `pix_med`). |

## Notas de implementação

- Tratar o webhook com **idempotência** (o mesmo evento pode ser reenviado).
- Registrar `status` + `reason` e cruzar com **`idTransaction`** / identificador interno do pedido, quando a Royal Banking enviar mais campos no payload real.
- **Não** confiar só no cliente: validar assinatura/HMAC ou IP, se a documentação oficial assim prescrever.

## Ver também

- `docs/api-royalbanking-pix-cashin.md` — Cash In (`callbackUrl`).
- `docs/api-royalbanking-pix-cashout.md` — Cash Out (`postbackUrl`).
