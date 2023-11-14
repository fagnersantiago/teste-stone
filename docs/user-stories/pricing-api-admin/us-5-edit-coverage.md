# Waner-On Life Insurance Pricing

## US-5 - Eu, como Admin, posso alterar uma cobertura, para que a precificação esteja atualizada.

A cobertura deve poder ser atualizada em qualquer campo, exceto o id gerado. E deve respeitar as mesmas regras do cadastro.

Os campos podem ser atualizados todos ou parcialmente, nesse caso, se o endpoint de edição for chamado passando apenas um campo, somente este campo deve ser alterado na cobertura.

Ao editar um item que foi deletado [US-6](./us-6-remove-coverage.md), este deve ser "ativado" novamente, sobrescrevendo o soft delete.

**PATCH** `/coverage/:coverageId`

Request Payload Obs: (Todos os campos são opcionais tendo em vista que pode ser atualizado um ou todos)

```json
{
  "name": <string>,
  "description": <string>,
  "capital": <string>,
  "premium": <string>
}
```

Response Payload - HTTP STATUS `200`

```json
{
    "data": {
        "coverageId": <string>,
        "name": <string>,
        "description": <string>,
        "capital": <string>,
        "premium": <string>
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
