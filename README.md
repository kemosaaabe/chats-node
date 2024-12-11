Изначально создаются тестовые данные (пользователь, пару комнат и несколько сообщений в комнатах)  
Данные пользователя:  
```
user: {
  username: "test_user",
  password: "test1234",
  email: "test_user@example.com"
}
```

Запуск проекта:  
```
// сбилдить и запустить контейнеры
docker compose up --build

// остановить контейнеры, очистив базу
docker compose down -v

// остановить контейнеры
docker compose down
// или просто Ctrl + C
```

### Backend port: 4000
### Auth
#### Register
route: `/api/register`  
method: **POST**  
body:
```
{
  username: "string";
  password: "string";
  email: "string";
}
```
#### Login
route: `/api/login`  
method: **POST**  
body:
```
{
  username: "string";
  password: "string";
}
```  
response: 
```
{
  token: "string";
}
```
    
Все руты ниже требуют авторизации в `headers`  
Пример: `Authorization: "Bearer ${token}"`  

### User
#### Get user profile
route: `/api/user/:id`  
method: **GET**  
response: 
```
{
  data: {
    id: "number",
    username: "string",
    email: "string",
    createdAt: "string",
    updatedAt: "string"
  }
}  
```
### Messages
#### Create message  
route: `/api/messages/:roomId`  
method: **POST**  
body:
```
{
  content: "string";
}
```
#### Update message  
route: `/api/messages/:messageId`  
method: **PUT**  
body:
```
{
  content: "string";
}
```
#### Delete message
route: `/api/messages/:messageId`  
method: **DELETE**  
### Rooms
#### Get rooms
route: `/api/rooms`  
method: **GET**  
response: 
```
{
  data: [
    {
      id: "number";
      name: "string";
    }
  ]
}
```
#### Get room
route: `/api/rooms/:id`  
method: **GET**  
response: 
```
{
  "data: {
    "id": "number",
    "name": "string",
    "messages": [
      {
        id: "number",
        room_id: "number",
        user_id": "number",
        content": "string",
        createdAt": "string",
        updatedAt": "string",
        user: {
          username: "string"
        }
      },
    ]
  }
}
```
#### Create room  
route: `/api/rooms`  
method: **POST**  
body:
```
{
  name: "string";
}
```
#### Update room  
route: `/api/rooms/:roomId`  
method: **PUT**  
body:
```
{
  name: "string";
}
```
#### Delete room
route: `/api/rooms/:roomId`  
method: **DELETE**  

### Errors
Ошибки валидации:  
```
{
  errors: [
    {
      [field.name]: "string"
    }
  ]
}
```
Другие ошибки: 
```
{ 
  error: "string" 
}
```
