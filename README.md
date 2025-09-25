# Catálogo de Videojuegos - React Native App

Una aplicación móvil completa de catálogo de videojuegos construida con React Native, que incluye autenticación, navegación, carrito de compras y una API backend desplegada en Vercel con base de datos Turso.

## 🎮 Características

- **Autenticación**: Login y registro de usuarios
- **Catálogo**: Visualización de videojuegos con imágenes y detalles
- **Búsqueda y Filtros**: Buscar por nombre, filtrar por género y ordenar por precio/calificación/alfabético
- **Detalles del Juego**: Pantalla completa con descripción, precio, plataformas y calificación
- **Carrito de Compras**: Agregar/quitar juegos, gestionar cantidades
- **Navegación**: Stack y Tab navigation con React Navigation
- **API Backend**: API REST desplegada en Vercel con base de datos Turso

## 📱 Pantallas

1. **Login/Registro**: Autenticación de usuarios
2. **Catálogo**: Lista de juegos con búsqueda y filtros
3. **Detalle del Juego**: Información completa del videojuego
4. **Carrito**: Gestión de compras
5. **Perfil**: Información del usuario (próximamente)

## 🛠️ Tecnologías Utilizadas

### Frontend (React Native)
- React Native 0.81.4
- TypeScript
- React Navigation 6
- React Context API
- React Native Linear Gradient
- React Native Vector Icons

### Backend (API)
- Vercel (Serverless Functions)
- Turso (SQLite Database)
- TypeScript
- CORS habilitado

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js >= 20
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS)

### 1. Clonar el Repositorio

```bash
git clone <tu-repositorio>
cd catalogo
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar la API

Navega a la carpeta `api` y sigue las instrucciones del README de la API:

```bash
cd api
npm install
```

Configura Turso y despliega en Vercel (ver `api/README.md` para detalles completos).

### 4. Actualizar URL de la API

En `src/services/api.ts`, actualiza la URL base con tu URL de Vercel:

```typescript
const API_BASE_URL = 'https://tu-api.vercel.app/api';
```

### 5. Ejecutar la Aplicación

#### Para Android
```bash
npm run android
```

#### Para iOS
```bash
npm run ios
```

## 📁 Estructura del Proyecto

```
catalogo/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── common/         # Botones, inputs, etc.
│   │   └── GameCard.tsx    # Tarjeta de juego
│   ├── context/            # Context API
│   │   ├── AuthContext.tsx # Autenticación
│   │   └── CartContext.tsx # Carrito de compras
│   ├── navigation/         # Configuración de navegación
│   ├── screens/            # Pantallas de la app
│   │   ├── auth/          # Login y registro
│   │   └── main/          # Pantallas principales
│   ├── services/          # API y servicios
│   ├── styles/            # Colores y estilos
│   └── types/             # Tipos de TypeScript
├── api/                   # Backend API
│   ├── api/              # Endpoints de Vercel
│   ├── lib/              # Configuración de DB
│   └── vercel.json       # Configuración de Vercel
└── android/              # Código nativo Android
```

## 🎨 Diseño y UI

La aplicación sigue el diseño mostrado en las imágenes de referencia con:

- **Tema Oscuro**: Colores azul oscuro y negro
- **Navegación por Pestañas**: Catálogo, Carrito, Perfil
- **Cards de Juegos**: Diseño atractivo con imágenes y información
- **Botones Verdes**: Para acciones principales
- **Interfaz Intuitiva**: Fácil navegación y uso

## 🔧 Configuración de la API

### Variables de Entorno (Vercel)

```bash
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-auth-token
```

### Endpoints Disponibles

- `GET /api/games` - Obtener juegos
- `GET /api/games/[id]` - Obtener juego específico
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario

## 🚀 Despliegue

### API (Vercel)
1. Configura Turso database
2. Despliega con `vercel --prod`
3. Configura variables de entorno

### App Móvil
1. Para Android: Genera APK con `cd android && ./gradlew assembleRelease`
2. Para iOS: Usa Xcode para generar IPA

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

Si tienes preguntas o sugerencias, no dudes en contactarme.

---

¡Disfruta explorando el catálogo de videojuegos! 🎮