# hacktivoverflow

User Router:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/register` | POST | **Body**<br>name: `String`<br>email: `String`<br>password: `String` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create a user
`/login` | POST | **Body**<br>email: `String`<br>password: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error | Sign a user in
`/users` | GET | `none` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all users
`/users/:id` | GET | **Headers**<br>id: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get one user
`/users/:id` | PUT | **Headers**<br>id: `String`<br>**Body**<br>name: `String`<br>email: `String`<br>password: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Update one user
`/users/:id` | DELETE | **Headers**<br>id: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete a user

Question Router:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/questions` | POST | **Body**<br>title: `String`<br>description: `String`<br>upvotes: `Number`<br>downvotes: `Number` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create a question
`/questions` | GET | `none` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all questions
`/questions/:id` | GET | **Headers**<br>id: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get one question
`/questions/:id` | PUT | **Headers**<br>id: `String`<br>**Body**<br>title: `String`<br>description: `String`<br>upvotes: `Number`<br>downvotes: `Number` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Update one question
`/questions/:id` | DELETE | **Headers**<br>id: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete a question

Answer Router:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/answers` | POST | **Body**<br>title: `String`<br>description: `String`<br>upvotes: `Number`<br>downvotes: `Number` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create a answer
`/answers` | GET | `none` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all answers
`/answers/:id` | GET | **Headers**<br>id: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get one answer
`/answers/:id` | PUT | **Headers**<br>id: `String`<br>**Body**<br>title: `String`<br>description: `String`<br>upvotes: `Number`<br>downvotes: `Number` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Update one answer
`/answers/:id` | DELETE | **Headers**<br>id: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete a answer