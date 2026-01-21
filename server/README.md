# Project Setup

## 1. Start PostgreSQL with Docker

Run the following command to start PostgreSQL in the background:

```bash
docker-compose up -d
````

---

## 2. Environment Variables

Create a `.env` file in the root of your project and add the following:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ims"

POSTGRES_DB="ims"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
```

> ⚠️ Adjust the values if you want to use different database credentials.

---

## 3. Install Dependencies

Install all required npm packages:

```bash
npm install
```

---

## 4. Database Setup with Prisma

### Reset the database

```bash
npx prisma migrate reset
```

> ⚠️ This will **erase all data** in the database. Use with caution.

### Create initial migration

```bash
npx prisma migrate dev --name init
```

### Generate Prisma client

```bash
npx prisma generate
```

### Seed the database

```bash
npx prisma db seed
```

---

## 5. Run the Server

Start the development server:

```bash
npm run start:dev
```

The server should now be running locally.

---

## 6. Additional Tools

### View the database

You can inspect the database using Prisma Studio:

```bash
npx prisma studio
```

This will open a web interface to browse your PostgreSQL database.

---

## Notes

* Make sure Docker is running before starting PostgreSQL.
* All database operations (migrations, seeds) assume your `DATABASE_URL` is correctly set.