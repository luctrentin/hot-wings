# Hot Wings API Documentation

This document outlines the RESTful API endpoints available in the Hot Wings food ordering application.

## Base URL

```
https://api.hotwings-app.com/api
```

For local development:
```
http://localhost:5000/api
```

## Authentication

Many endpoints require authentication. To authenticate, include a valid JWT token in the request headers:

```
Authorization: Bearer <token>
```

### Authentication Endpoints

#### Register a New User

- **URL:** `/auth/register`
- **Method:** `POST`
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
    ```
- **Error Response:**
  - **Code:** 400
  - **Content:**
    ```json
    {
      "error": "Email already in use"
    }
    ```

#### Login a User

- **URL:** `/auth/login`
- **Method:** `POST`
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
    ```
- **Error Response:**
  - **Code:** 401
  - **Content:**
    ```json
    {
      "error": "Invalid credentials"
    }
    ```

#### Get Current User

- **URL:** `/auth/me`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
    ```
- **Error Response:**
  - **Code:** 401
  - **Content:**
    ```json
    {
      "error": "Not authorized"
    }
    ```

## Menu Endpoints

#### Get All Menu Items

- **URL:** `/menu`
- **Method:** `GET`
- **Auth Required:** No
- **Query Parameters:**
  - `category` (optional): Filter by category
  - `search` (optional): Search by name
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    [
      {
        "id": "item_id",
        "name": "Classic Wings",
        "description": "Original classic wings",
        "price": 10.99,
        "image": "wings.jpg",
        "category": "Wings",
        "available": true,
        "spicyLevel": 1
      },
      // More items...
    ]
    ```

#### Get a Specific Menu Item

- **URL:** `/menu/:id`
- **Method:** `GET`
- **Auth Required:** No
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": "item_id",
      "name": "Classic Wings",
      "description": "Original classic wings",
      "price": 10.99,
      "image": "wings.jpg",
      "category": "Wings",
      "available": true,
      "spicyLevel": 1
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:**
    ```json
    {
      "error": "Menu item not found"
    }
    ```

#### Create a New Menu Item

- **URL:** `/menu`
- **Method:** `POST`
- **Auth Required:** Yes (Admin only)
- **Request Body:**
  ```json
  {
    "name": "Spicy Wings",
    "description": "Extra hot spicy wings",
    "price": 12.99,
    "image": "spicy-wings.jpg",
    "category": "Wings",
    "available": true,
    "spicyLevel": 3
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "id": "new_item_id",
      "name": "Spicy Wings",
      "description": "Extra hot spicy wings",
      "price": 12.99,
      "image": "spicy-wings.jpg",
      "category": "Wings",
      "available": true,
      "spicyLevel": 3
    }
    ```
- **Error Response:**
  - **Code:** 401
  - **Content:**
    ```json
    {
      "error": "Not authorized as admin"
    }
    ```

#### Update a Menu Item

- **URL:** `/menu/:id`
- **Method:** `PUT`
- **Auth Required:** Yes (Admin only)
- **Request Body:**
  ```json
  {
    "price": 13.99,
    "available": false
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": "item_id",
      "name": "Spicy Wings",
      "description": "Extra hot spicy wings",
      "price": 13.99,
      "image": "spicy-wings.jpg",
      "category": "Wings",
      "available": false,
      "spicyLevel": 3
    }
    ```

#### Delete a Menu Item

- **URL:** `/menu/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (Admin only)
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "message": "Menu item deleted"
    }
    ```

## Order Endpoints

#### Get User Orders

- **URL:** `/orders`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    [
      {
        "id": "order_id",
        "userId": "user_id",
        "items": [
          {
            "id": "item_id",
            "menuItemId": "menu_item_id",
            "name": "Classic Wings",
            "quantity": 2,
            "price": 10.99
          }
        ],
        "total": 21.98,
        "status": "confirmed",
        "createdAt": "2023-04-15T12:00:00Z",
        "updatedAt": "2023-04-15T12:05:00Z",
        "paymentMethod": "credit"
      },
      // More orders...
    ]
    ```

#### Get a Specific Order

- **URL:** `/orders/:id`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": "order_id",
      "userId": "user_id",
      "items": [
        {
          "id": "item_id",
          "menuItemId": "menu_item_id",
          "name": "Classic Wings",
          "quantity": 2,
          "price": 10.99
        }
      ],
      "total": 21.98,
      "status": "confirmed",
      "createdAt": "2023-04-15T12:00:00Z",
      "updatedAt": "2023-04-15T12:05:00Z",
      "paymentMethod": "credit",
      "deliveryAddress": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "TX",
        "zipCode": "12345"
      }
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:**
    ```json
    {
      "error": "Order not found"
    }
    ```

#### Create a New Order

- **URL:** `/orders`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "items": [
      {
        "menuItemId": "menu_item_id",
        "quantity": 2
      }
    ],
    "paymentMethod": "credit",
    "deliveryAddress": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "TX",
      "zipCode": "12345",
      "instructions": "Ring doorbell"
    }
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "id": "new_order_id",
      "userId": "user_id",
      "items": [
        {
          "id": "item_id",
          "menuItemId": "menu_item_id",
          "name": "Classic Wings",
          "quantity": 2,
          "price": 10.99
        }
      ],
      "total": 21.98,
      "status": "pending",
      "createdAt": "2023-04-15T12:00:00Z",
      "updatedAt": "2023-04-15T12:00:00Z",
      "paymentMethod": "credit",
      "deliveryAddress": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "TX",
        "zipCode": "12345",
        "instructions": "Ring doorbell"
      }
    }
    ```

#### Update Order Status

- **URL:** `/orders/:id`
- **Method:** `PUT`
- **Auth Required:** Yes (Admin only)
- **Request Body:**
  ```json
  {
    "status": "preparing",
    "estimatedDeliveryTime": "2023-04-15T13:00:00Z"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "id": "order_id",
      "status": "preparing",
      "estimatedDeliveryTime": "2023-04-15T13:00:00Z",
      "updatedAt": "2023-04-15T12:10:00Z"
    }
    ```

## Error Handling

All endpoints return properly formatted error responses:

- **400 Bad Request**: Invalid inputs or validation errors
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: Authenticated but not authorized
- **404 Not Found**: Resource not found
- **500 Server Error**: Unexpected server error

Example error response:
```json
{
  "error": "Detailed error message"
}
```

## Data Models

### User
- id: string
- name: string
- email: string
- password: string (hashed, not returned in responses)
- role: string ('user' or 'admin')

### Menu Item
- id: string
- name: string
- description: string
- price: number
- image: string
- category: string
- available: boolean
- spicyLevel?: number (0-3)
- options?: MenuItemOption[]

### Order
- id: string
- userId: string
- items: OrderItem[]
- total: number
- status: string ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')
- createdAt: string (ISO date)
- updatedAt: string (ISO date)
- estimatedDeliveryTime?: string (ISO date)
- paymentMethod: string ('credit', 'debit', 'cash')
- deliveryAddress?: Address

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per minute for authenticated users
- 30 requests per minute for unauthenticated users 