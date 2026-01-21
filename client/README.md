# Project Setup

## Environment Setup

1. **Create a `.env` file** in the root of your project:

```bash
touch .env
````

2. **Add the API URL** to the `.env` file:

```env
VITE_API_URL="http://localhost:3000/api"
```

> ⚠️ Make sure to replace `http://localhost:3000/api` with your actual API endpoint if it’s different.

---

## Install Dependencies

Install all required packages:

```bash
npm install
```

---

## Run the Project

Start the development server:

```bash
npm run dev
```

After running this, your application should be available at [http://localhost:5173](http://localhost:5173) (default Vite port).