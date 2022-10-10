# Desafio U4C

## Modele um sistema para uma empresa de proteção veicular.

- [x] Nesse sistema existem clientes e terceiros.

- [x] Os clientes podem criar uma conta inserindo informações básicas de cadastro.

- [x] Os clientes podem editar alguns dados cadastrados.

- [x] Os clientes podem criar um evento de acidente, onde será possível informar o veículo envolvido no acidente e o(s) terceiro(s).

- [x] Os terceiros são cadastrados quando é criado um acidente, se não houver um registro prévio na base de dados.

- [x] Todos os usuários(clientes e terceiros) precisam ter documentos associados as suas contas.

- [x] Quando um houve o cadastro de um cliente que já foi envolvido como terceiro em um acidente, é preciso migrar o usuário para cliente sem perder o vínculo criado no acidente.

## Como utilizar este repositorio

Clone o repositorio e rode o comando ```docker-compose up```

## Rotas da api

| Method | Route | Description |
| --- | --- | --- |
| POST | /user | Cria um usuario
| POST | /user/login | Loga em uma conta
| PUT | /user | Atualiza o registro do usuario
| POST | /accident | Cria um registro de acidente |
| GET | /accident | Lista todos os acidentes |
| GET | /accident/{id} | Visualiza as informações de um acidente |
| DELETE | /accident/{id} | Deleta um registro de acidente |

## `POST` /client
### [request]
```json
{
	"name": "Pedrãoo",
	"cpf": "74185296346",
	"birthdate": "2002-10-28",
	"phone": "758149762554",
	"address": {
		"zip": 0,
		"street": "aaa",
		"city": "bbb",
		"state": "cccc",
		"country": "ddd"
	},
	"client": {
		"email": "pedraoa@gmail.com",
		"password": "abcdefgh"
	}
}
```

### [response]
```json
{
	"name": "Pedrãoo",
	"cpf": "74185296346",
	"birthdate": "2002-10-28T00:00:00.000Z",
	"phone": "758149762554",
	"address": {
		"zip": 0,
		"street": "aaa",
		"city": "bbb",
		"state": "cccc",
		"country": "dddd",
		"id": 1,
		"created_at": "2022-10-10T01:44:18.529Z",
		"updated_at": "2022-10-10T01:44:18.529Z"
	},
	"client": {
		"email": "pedraoa@gmail.com",
		"id": 1,
		"createdAt": "2022-10-10T01:44:18.529Z",
		"updatedAt": "2022-10-10T01:44:18.529Z"
	},
	"id": 1,
	"createdAt": "2022-10-10T01:44:18.529Z",
	"updatedAt": "2022-10-10T01:44:18.529Z"
}
```

## `POST` /user/login
### [request]
```json
{
  "email": "pedraoa@gmail.com",
  "password": "abcdefgh"
}
```

### [response]
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY2xpZW50SWQiOjEsImlhdCI6MTY2NTMzMjc3NSwiZXhwIjoxNjY1NDE5MTc1fQ.pkC0LooHm7QaKUkOEqy3WjLMgiKfn_0C-YgAfzNfnSY"
}
```

## `JWT` `PUT` /user
### [request]
```json
{
	"phone": "7418529634650",
	"client": {
		"email": "testes@gmail.com",
		"password": "abcdefgh"
	},
	"address": {
		"zip": 1
	}
}
```

### [response]
```json
{
	"name": "Pedrãoo",
	"cpf": "74185296346",
	"birthdate": "2002-10-28T00:00:00.000Z",
	"phone": "7418529634650",
	"address": {
		"zip": 1,
		"street": "aaa",
		"city": "bbb",
		"state": "cccc",
		"country": "ddd",
		"id": 1,
		"created_at": "2022-10-10T01:44:18.529Z",
		"updatedAt": "2022-10-10T01:52:31.529Z"
	},
	"client": {
		"email": "testes@gmail.com",
		"id": 1,
		"createdAt": "2022-10-10T01:44:18.529Z",
		"updatedAt": "2022-10-10T01:52:31.529Z"
	},
	"id": 1,
	"createdAt": "2022-10-10T01:44:18.529Z",
	"updatedAt": "2022-10-10T01:52:31.529Z"
}
```

## `JWT` `POST` /accident
### [request]
```json
{
	"description": "batida frontal",
	"vehicle": {
		"model": "model",
		"brand": "brand",
		"licensePlate": "ABCDEFG",
		"color": "color",
		"chassi": "chassi"
	},
	"thirds": [{
		"name": "carlão",
		"cpf": "72458168246"
	}],
}
```

### [response]
```json
{
	"description": "batida frontal",
	"vehicle": {
		"id": 1,
		"model": "model",
		"brand": "brand",
		"licensePlate": "ABCDEFG",
		"color": "color",
		"chassi": "chassi",
		"createdAt": "2022-10-09T20:48:07.750Z",
		"updatedAt": "2022-10-09T20:48:07.750Z"
	},
	"thirds": [
		{
			"userId": 2,
			"id": 1,
			"createdAt": "2022-10-10T03:56:37.220Z"
		}
	],
	"id": 1,
	"createdAt": "2022-10-10T03:56:37.220Z",
	"updatedAt": "2022-10-10T03:56:37.220Z"
}
```

## `JWT` `GET` /accident

### [response]
```json
[
	{
		"id": 1,
		"description": "batida frontal",
		"createdAt": "2022-10-09T21:22:33.112Z",
		"updatedAt": "2022-10-09T21:22:33.112Z",
		"thirds": [
			{
				"id": 1,
				"userId": 2,
				"createdAt": "2022-10-09T21:22:33.112Z",
				"user": {
					"id": 2,
					"name": "Pedrão",
					"cpf": "70862608197",
					"createdAt": "2022-10-09T20:48:07.738Z",
					"updatedAt": "2022-10-09T21:58:13.460Z"
				}
			}
		],
		"client": {
			"id": 1,
			"email": "pedraoa@gmail.com",
			"createdAt": "2022-10-09T20:47:50.380Z",
			"updatedAt": "2022-10-09T20:47:50.380Z"
		}
	}
]
```

## `JWT` `GET` /accident/{id}
### [response]
```json
{
	"id": 1,
	"description": "batida frontal",
	"createdAt": "2022-10-09T21:22:33.112Z",
	"updatedAt": "2022-10-09T21:22:33.112Z",
	"thirds": [
		{
			"id": 1,
			"userId": 2,
			"createdAt": "2022-10-09T21:22:33.112Z",
			"user": {
				"id": 2,
				"name": "Pedrão",
				"cpf": "70862608197",
				"createdAt": "2022-10-09T20:48:07.738Z",
				"updatedAt": "2022-10-09T21:58:13.460Z"
			}
		}
	],
	"client": {
		"id": 1,
		"email": "pedraoa@gmail.com",
		"createdAt": "2022-10-09T20:47:50.380Z",
		"updatedAt": "2022-10-09T20:47:50.380Z"
	}
}
```

## `JWT` `DELETE` /accident/{id}


## Diagrama do banco de dados
![Database Diagram](.github/assets/diagram.png?raw=true "Database Diagram")
