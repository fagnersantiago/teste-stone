# Waner-On Life Insurance Pricing

## US-2 - Eu, como Admin, alterar a role de um usuário para `user` ou `admin`

O Admin deve alterar a role de um usuário. As roles permitidas são `user` ou `admin`

**PATCH** `/users/:userId`

Request Payload

```json
{
    "role": <string>
}
```

Response Payload - HTTP STATUS `200`

```json
{
    "data": {
        "userId": <string>,
        "username": <string>,
        "role": <string>
    }
}
```

Error Response - HTTP STATUS `403` (Stauts code usado quando o usuário não tem pemissão para criar. atualizar ou delatar)

```json
{
  "error": {
    "code": "403",
    "message": "Unauthorized! Only admin can change users data"
  }
}
```

Error Response - HTTP STATUS `404` (Stauts code usado quando usuário não encontrado ao tentar atulizar uma role)

```json
{
  "error": {
    "code": 404,
    "message": "User not found"
  }
}
```

Error Response - HTTP STATUS `422` ( Esse status geralmente é usado para atender critérios de validação do servidor como: validar campos ausentes, valores inválidos. )

```json
{
  "error": {
    "code": "422",
    "message": "'the password must have between 8 64 characters. Contain upper and lower case letters, numbers and at least one of the following symbols @#!$%'"
  }
}
```
