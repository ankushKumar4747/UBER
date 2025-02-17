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