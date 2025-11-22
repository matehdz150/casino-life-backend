Backend del proyecto Casino Life, desarrollado en Node.js (Express + TypeScript) con PostgreSQL + Drizzle ORM y documentación automática con Swagger.

--ESTRUCTURA DEL PROYECTO--
casino-life-backend/
│
├── docker-compose.yml.  # Configuración de la base de datos PostgreSQL
├── drizzle.config.ts.  # Configuración de Drizzle ORM
├── src/
│   ├── app.ts.  # Configuración del servidor Express
│   ├── server.ts.  # Punto de entrada principal
│   ├── config/
│   │   ├── db.ts.  # Conexión y setup de Drizzle + PostgreSQL
│   │   └── swagger.ts.  # Configuración de Swagger
│   ├── controllers/.  # Lógica de las rutas
│   ├── middlewares/.  # Autenticación, manejo de errores
│   ├── db/
│   │   └── schema/.  # Modelos de datos (User, Game_Record)
│   │       ├── User.ts
│   │       └── Game_Record.ts
│   ├── routes/.  # Definición de endpoints
│   └── utils/.  # Funciones auxiliares
│
├── .env.  # Variables de entorno
├── package.json
├── tsconfig.json
└── README.md


---CONFIGURACION INICIAL---
1. npm install

2. Crear un archivo .env en raiz del proyecto:

DATABASE_URL=postgresql://casino_user:casino_password@127.0.0.1:5432/casino_db
JWT_SECRET=mi_super_secreto_seguro
PORT=8000

3. Levantar PostgreSQL con Docker
4. docker compose up -d
5. npx drizzle-kit generate.  #Esto genera los archivos SQL dentro de /drizzle.
6. npx drizzle-kit push.  #Para aplicar los cambios en la base de datos:
7. npm run dev

---AUTENTICACION JWT---
Cada ruta protegida requiere un header:
Authorization: Bearer <tu_token_jwt>