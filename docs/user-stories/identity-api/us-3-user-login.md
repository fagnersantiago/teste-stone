# Waner-On Life Insurance Pricing

## US-3 - Eu, como User, posso efetuar um login com a senha fornecida pelo Admin, para gerar um JWT token e consumir a api de precificação.

O usuário deve poder efetuar o login no sistema fornecendo o usuário e senha, e deve receber de volta um token JWT assinado que será utilizado para o consumo das APIs.

O token deve ser gerando no formato de JWT assinado, utilizando uma chave assimétrica.

Lembre-se de fazer o tratamento correto dos error, como por exemplo (mas não somente):

- payload inválido
- senha incorreta

Para manter a privacidade e segurança, a falha na autenticação (dado um payload correto) deve apenas informar que a combinação `username` e `password` está incorreta.

**POST** `/auth`

Request Payload

```json
{
    "username": <string>,
    "password": <string>
}
```

Response Payload - HTTP STATUS `201`

```json
{
    "data": {
        "user": {
            "userId": <string>,
            "username": <string>,
            "role": <string>
        },
        "token": <string>
    }
}
```

Error Response - HTTP STATUS `401` (Status 401 se o email ou senha estiver errado. Por questão de segurança a resposta será a mesma tanto se o usuário não quanto se a senha estiver inválida)

```json
{
  "error": {
    "code": "401",
    "message": "Invalid credentials username e/or email "
  }
}
```
