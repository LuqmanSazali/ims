# Inventory Management System

This repository contains a full-stack **Inventory Management System**, split into separate **client** and **server** applications.

---

## Project Structure

```text
.
├── client/   # Frontend (Vite + React)
├── server/   # Backend (NestJS + Prisma + PostgreSQL)
└── README.md
````

---

## Setup Instructions

Setup instructions are maintained **per application** to keep concerns separated.

### Client (Frontend)

Refer to the client README for environment variables and startup steps:

👉 [`client/README.md`](./client/README.md)

---

### Server (Backend)

Refer to the server README for database, Prisma, and server setup:

👉 [`server/README.md`](./server/README.md)

---

## Notes

* The **client** and **server** are designed to run independently.
* Make sure the backend server is running before starting the client.
* Environment variables are **not shared** between client and server.

---

## Tech Stack

**Client**

* React
* Vite
* Material UI

**Server**

* NestJS
* Prisma
* PostgreSQL
* Docker