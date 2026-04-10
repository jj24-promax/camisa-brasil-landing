# API — Consulta de saldo

Permite consultar o **saldo disponível** (e dados associados) de um utilizador, com autenticação por **API Key** no cabeçalho.

> Substitui o **host** de exemplo pelo domínio real da API em produção ou staging.

## Autenticação

| Cabeçalho | Valor |
|-----------|--------|
| `api-key` | Chave de API ativa do utilizador. |
| `Accept` | `application/json` (recomendado) |

## Endpoint

| Item | Valor |
|------|--------|
| **Método** | `GET` |
| **Caminho** | `/saldo` |
| **Exemplo local** | `http://localhost/saldo` |
| **Exemplo produção** | `https://seudominio.com/api/saldo` *(ajustar ao teu deploy)* |

URL completa típica: `{BASE_URL}/saldo` ou `{BASE_URL}/api/saldo`, conforme o gateway.

## Exemplo cURL

```bash
curl -X GET "http://localhost/saldo" \
  -H "Accept: application/json" \
  -H "api-key: SUA_API_KEY_AQUI"
```

## Postman

- **Método:** `GET`
- **URL:** ex. `http://localhost/saldo`

**Headers:**

| Key | Value |
|-----|--------|
| `Accept` | `application/json` |
| `api-key` | `SUA_API_KEY_AQUI` |

## Resposta de sucesso (200 OK)

```json
{
  "success": true,
  "data": {
    "user_id": "@teste",
    "email": "teste@gmail.com",
    "saldo": {
      "raw": -175,
      "formatted": "-175.00"
    },
    "reserva_financeira": {
      "raw": 100,
      "formatted": "100.00"
    },
    "api_key_status": "ativo"
  }
}
```

### Campos de `data`

| Campo | Descrição |
|-------|-----------|
| `user_id` | Identificador do utilizador. |
| `email` | E-mail do utilizador. |
| `saldo.raw` | Saldo em valor numérico (ex.: float / número). |
| `saldo.formatted` | Saldo formatado como string (padrão com ponto decimal). |
| `reserva_financeira.raw` | Reserva financeira — valor bruto. |
| `reserva_financeira.formatted` | Reserva financeira — valor formatado. |
| `api_key_status` | Estado da API Key (ex.: `ativo`). |

## Erro — API Key ausente ou inválida

```json
{
  "success": false,
  "error": {
    "type": "invalid_api_key",
    "message": "Não autorizado: api-key inválida ou inativa."
  }
}
```

## Regras importantes

- A **API Key** deve estar **ativa** e associada a um **utilizador válido**.
- Todas as respostas são **JSON**.
- Valores monetários no formato **`formatted`** seguem convenção com **ponto** como separador decimal (estilo US); validar moeda no teu backend se necessário.

## Segurança

- Chamar **apenas do servidor** quando a `api-key` for secreta; nunca expor no frontend público.
