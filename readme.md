# Backend API Documentation

## /users/register

### Description
This endpoint is used to register a new user. It validates the input data, hashes the user's password, creates a new user in the database, and returns an authentication token along with the user details.

### Endpoint
`POST /users/register`

### Request Body
The request body should be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname`: The user's first name (minimum 3 characters, required)
  - `lastname`: The user's last name (minimum 3 characters, optional)
- `email`: The user's email address (must be a valid email, required)
- `password`: The user's password (minimum 6 characters, required)

Example:
 ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }


```
## /users/login

### Description
This endpoint is used to authenticate a user. It validates the input data, checks the user's credentials, and returns an authentication token along with the user details if the credentials are valid.

### Endpoint
`POST /users/login`

### Request Body
The request body should be a JSON object containing the following fields:

- `email`: The user's email address (must be a valid email, required)
- `password`: The user's password (minimum 6 characters, required)

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}

```
## /users/profile

### Description
This endpoint retrieves the authenticated user's profile. The request must include a valid authentication token—either as a "Bearer" token in the `Authorization` header or as a cookie. The authentication is handled by the middleware in [`authUser`](Backend/middleware/auth.middleware.js), which verifies the token and populates `req.user`.

### Endpoint
`GET /users/profile`

### Headers
- **Authorization**: Bearer token (or include the token as a cookie)

### Response
On success, the endpoint returns a JSON object containing the user's profile data. An example response is as follows:

```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}

```

## /users/logout

### Description
This endpoint is used to log out a user. It invalidates the user's authentication token by adding it to a blacklist and clearing the token cookie.

### Endpoint
`GET /users/logout`

### Headers
- **Authorization**: Bearer token (or include the token as a cookie)

### Response
On success, the endpoint returns a JSON object confirming the logout success. An example response is as follows:

```json
{
  "message": "logout success"
}


```
## /captain/register

### Description
This endpoint is used to register a new captain. It validates the input data, hashes the captain's password, creates a new captain in the database, and returns an authentication token along with the captain details.

### Endpoint
`POST /captain/register`

### Request Body
The request body should be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname`: The captain's first name (minimum 3 characters, required)
  - `lastname`: The captain's last name (minimum 3 characters, optional)
- `email`: The captain's email address (must be a valid email, required)
- `password`: The captain's password (minimum 8 characters, required)
- `vehicle`: An object containing:
  - `color`: The vehicle's color (minimum 3 characters, required)
  - `plate`: The vehicle's plate number (minimum 3 characters, required)
  - `capacity`: The vehicle's capacity (minimum 1, required)
  - `vehicleType`: The type of vehicle (must be one of "car", "motorcycle", or "auto", required)

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}