# 🖥️ Frontend - Proyecto Final SD

Aplicación frontend desarrollada como parte del proyecto final para la cátedra *Ingeniería de Software*.
Incluye:

* Autenticación y autorización mediante Auth0.
* Visualización condicional de endpoints según el rol del usuario (admin / user / público).
* Creación de nuevos usuarios desde la interfaz.
* Interfaz moderna y responsiva con TailwindCSS.

---

## 👥 Integrantes del grupo

* Adriano Persia
* Matías Ongay

---

## ✅ Requisitos para su ejecución

* Node.js 18 o superior
* npm 
* Conexión a internet (para integración con Auth0)

---

## ⚙️ Instrucciones de instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd final-sd-frontend
```

---

### 2️⃣ Instalar dependencias

```bash
npm install
```
---

### 3️⃣ Configurar Auth0

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_AUTH0_DOMAIN=dev-2p6bkdu5vkol2d5t.us.auth0.com
VITE_AUTH0_CLIENT_ID=8z9jht0rvFWzHAG4JBsqudhqTLCtLzP5
VITE_AUTH0_AUDIENCE=https://final-sd-api
VITE_AUTH0_CALLBACK_URL=http://localhost:5173
```

> Asegurarse de que la URL `http://localhost:5173` esté configurada como callback, logout y origin URL en el panel de Auth0.

---

### 4️⃣ Ejecutar la aplicación

```bash
npm run dev
```


> La aplicación quedará disponible en: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Tecnologías utilizadas

* **React** (con Vite)
* **TypeScript**
* **Auth0** (gestión de autenticación y autorización)
* **Tailwind CSS** (estilos responsivos y utilitarios)
* **Axios** (consumo de API)
* **React Router DOM v6** (navegación entre rutas)
* **ESLint + Prettier** (formato y calidad de código)
* **Vite Environment Variables**
* **Visual Studio Code** (entorno de desarrollo recomendado)

---

## 🔧 Rutas principales

| Ruta           | Descripción                                     | Protección            |
| -------------- | ----------------------------------------------- | --------------------- |
| `/`            | Página de inicio                                | Pública               |
| `/endpoints`   | Probador de endpoints y redirecciones           | Protegida (según rol) |
| `/create-user` | Formulario para crear nuevos usuarios           | Solo admin            |
| `/admin`       | Vista de administración con listado de usuarios | Solo admin            |

---

## ✨ Notas adicionales

* Se utilizan tokens JWT de Auth0 en cada petición protegida al backend.
* La aplicación se comunica con el backend desarrollado en Spring Boot disponible en el repositorio `final-sd-api`.

---

*Proyecto desarrollado en 2025 para la Universidad del Aconcagua*
