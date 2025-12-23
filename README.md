# AsipBook Authentication Service

This repository contains the **Authentication Service** for the **AsipBook** platform. It is one of several microservices that make up the AsipBook ecosystem, dedicated specifically to handling user identity, authentication, and authorization.

## 📖 Overview

The Auth Service is responsible for managing user accounts and securing access to the AsipBook application. It handles user registration, login, and the issuance of JSON Web Tokens (JWT) to allow secure communication between clients and other microservices.

### Key Features
- **User Management**: Registration and account creation.
- **Authentication**: Secure login using email and password.
- **Security**: Password hashing using `bcrypt` and token-based authentication using `jsonwebtoken` (JWT).
- **Database**: Data persistence using **Prisma ORM** with a MySQL database.
- **Type Safety**: Built with **TypeScript** for robust and maintainable code.

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt

## 📂 Project Structure

The project follows a modular architecture to ensure scalability and separation of concerns.

```text
auth-service-asipbook/
├── prisma/
│   └── schema.prisma       # Database schema definition
├── src/
│   ├── config/             # Configuration files (Env, Database connection)
│   ├── middlewares/        # Express middlewares (Error handling, Auth checks)
│   ├── modules/            # Feature-based modules
│   │   └── auth/           # Authentication module
│   │       ├── auth.controller.ts  # Request handlers
│   │       ├── auth.routes.ts      # Route definitions
│   │       ├── auth.service.ts     # Business logic
│   │       └── auth.types.ts       # Type definitions
│   ├── utils/              # Utility functions (JWT helper, Password hashing)
│   ├── app.ts              # Express app setup
│   └── server.ts           # Server entry point
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```