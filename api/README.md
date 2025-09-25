# API del Catálogo de Videojuegos

Esta es la API backend para la aplicación de catálogo de videojuegos, construida para desplegarse en Vercel con Turso como base de datos.

## Configuración

### 1. Configurar Turso Database

1. Instala Turso CLI:
```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

2. Crea una cuenta y base de datos:
```bash
turso auth signup
turso db create catalogo-games
```

3. Obtén la URL y token de la base de datos:
```bash
turso db show catalogo-games
turso db tokens create catalogo-games
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Completa las variables con tus datos de Turso:
- `TURSO_DATABASE_URL`: URL de tu base de datos Turso
- `TURSO_AUTH_TOKEN`: Token de autenticación de Turso

### 3. Desplegar en Vercel

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Despliega la API:
```bash
vercel --prod
```

3. Configura las variables de entorno en Vercel:
```bash
vercel env add TURSO_DATABASE_URL
vercel env add TURSO_AUTH_TOKEN
```

## Endpoints de la API

### Juegos

- `GET /api/games` - Obtener todos los juegos
  - Query params: `search`, `genre`, `sort`
- `GET /api/games/[id]` - Obtener juego por ID
- `POST /api/games` - Crear nuevo juego
- `PUT /api/games/[id]` - Actualizar juego
- `DELETE /api/games/[id]` - Eliminar juego

### Autenticación

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario

## Estructura de la Base de Datos

### Tabla `games`
```sql
CREATE TABLE games (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT NOT NULL,
  genre TEXT NOT NULL,
  rating REAL NOT NULL,
  platform TEXT NOT NULL,
  release_date TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla `users`
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Desarrollo Local

1. Instala dependencias:
```bash
npm install
```

2. Ejecuta en modo desarrollo:
```bash
npm run dev
```

La API estará disponible en `http://localhost:3000/api`

eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9eyJhIjoicnciLCJpYXQiOjE3NTg4MjM4MzQsImlkIjoiMGQ5MWUyNzMtNjZiMy00NzgxLWI0NzQtNGZjMGYwMzljZjU0IiwicmlkIjoiYmRlOTNhY2UtMDYxZi00MTE3LTg0MWEtNWZhMzBmZjk3ZmQ2In0.nbo6M8dGvewXvamvQSKPTot85LLz1TGBqnYG0_SS7bCgMufyT9mLqUjNDpOkd4KfLglvKm8JlXbFdMUqf03PCg