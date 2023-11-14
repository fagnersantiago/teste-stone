# Waner-On Life Insurance Pricing

## US-5 - Eu, como Admin, posso remover uma cobertura, para não permitir mais a precificação com esta cobertura.

Para este case, utilize um `soft delete` para remover a cobertura do banco de dados. Lembre-se que os itens deletados não devem poder ser utilizados na precificação.

**PATCH** `/coverage/:coverageId`

Request Payload

```json
No body
```

Response Payload - HTTP STATUS `200`

```json
 data: {
        "code": 200,
        "coverage": {
            "coverageId": <string>,
            "isdeleted": <boolean>
        }
    }
```

Error Response - HTTP STATUS `404` (Status 404 quando id passado na requisição para atulizar a coverage não existir.)

```json
{
  "error": {
    "code": 404,
    "message": "Coverage not found"
  }
}
```

Error Response - HTTP STATUS `404` (Stauts code usado quando o usuário não tem pemissão para criar. atualizar ou delatar)

```json
{
  "error": {
    "code": "403",
    "message": "Unauthorized! Only admin can change users data"
  }
}
```

Error Response - HTTP STATUS `401` (Stauts code usado quando token inválido)

```json
{
  "error": {
    "code": 401,
    "message": "Invalid token "
  }
}
```
