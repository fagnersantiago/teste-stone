# Waner-On Life Insurance Pricing

## US-1 - Eu, como Admin, posso cadastrar novos usuários `admin`, fornecendo o email e senha

O Admin deve poder cadastrar novos usuários no sistema, esses usuários por padrão terão a role `user`.

O sistema deve gerar um id único para o usuário.

Não deve ser permitido o cadastro de `username` já existentes, também não se deve permitir uma `username` ou `password` vazios, ou seja, strings vazias ou contendo somente espaços.

O sistema deve garantir uma senha forte, que nesse caso devem seguir as seguintes regras:

- Conter no mínimo 8 caracteres
- Conter no máximo 64 caracteres
- Conter letras maiúsculas e minúsculas
- Conter números
- Conter pelo menos um dos seguintes símbolos @#!$%, outros símbolos não devem ser permitidos

_Dica: utilize Regex para validar a senha_

**POST** `/users`

Request Payload

```json
{
    "username": <string>,
    "password": <string>
}
```

Response Payload - HTTP STATUS 201

```json
{
    "data": {
        "userId": <string>,
        "username": <string>,
        "role": <string>
    }
}
```

Error Response - HTTP STATUS `409` (Conflito ao tentar cadastrar um usuário já existente)

```json
{
  "error": {
    "code": "409",
    "message": "User Already Exists"
  }
}
```

Error Response - HTTP STATUS `403` ( Esse status geralmente é usado para atender critérios de validação do servidor como: validar campos ausentes, valores inválidos. )

```json
{
  "error": {
    "code": "403",
    "message": "'Unauthorized! Only admin can change users data"
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
