# 🚀 Guía de Despliegue Gratuito

Esta guía te ayudará a desplegar el frontend y backend de forma **100% gratuita**.

## 📋 Requisitos Previos

- Cuenta de GitHub (tu código debe estar en un repositorio público)
- Cuenta de Vercel (gratis): https://vercel.com
- Cuenta de Render (gratis): https://render.com

---

## 🎨 Despliegue del Frontend (Vercel)

### Paso 1: Preparar el Repositorio

Asegúrate de que tu código esté pusheado a GitHub:

```bash
git push origin develop
```

### Paso 2: Importar en Vercel

1. Ve a https://vercel.com y haz login con GitHub
2. Click en **"Add New Project"**
3. Selecciona tu repositorio `meli-search`
4. Configura el proyecto:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Paso 3: Variables de Entorno

En la sección "Environment Variables", agrega:

```
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com
```

> ⚠️ **Importante**: Primero despliega el backend para obtener la URL real, luego vuelve aquí y actualiza esta variable.

### Paso 4: Deploy

1. Click en **"Deploy"**
2. Espera 2-3 minutos
3. ¡Tu frontend estará en vivo! 🎉

La URL será algo como: `https://meli-search-frontend.vercel.app`

---

## ⚙️ Despliegue del Backend (Render)

### Paso 1: Crear Web Service

1. Ve a https://render.com y haz login con GitHub
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio `meli-search`

### Paso 2: Configuración

- **Name**: `meli-search-backend`
- **Region**: Oregon (Free)
- **Branch**: `main` ⚠️ **Importante: Usar main, no develop**
- **Root Directory**: `apps/backend`
- **Runtime**: Node
- **Build Command**:
  ```bash
  npm install --legacy-peer-deps && npm run build --workspace=apps/backend
  ```
- **Start Command**:
  ```bash
  npm run start:prod --workspace=apps/backend
  ```

### Paso 3: Variables de Entorno

En la sección "Environment", agrega:

```
NODE_ENV=production
PORT=3000
API_PREFIX=api/v1
CORS_ORIGIN=https://tu-frontend.vercel.app
SWAGGER_ENABLED=true
SWAGGER_PATH=api
MOCK_DELAY_MIN=200
MOCK_DELAY_MAX=800
```

> ⚠️ **Importante**: Reemplaza `https://tu-frontend.vercel.app` con la URL real de tu frontend en Vercel.

### Paso 4: Plan

- Selecciona **"Free"** plan
- Click en **"Create Web Service"**

### Paso 5: Deploy

1. Render comenzará a construir automáticamente
2. Espera 5-7 minutos (primera vez es más lento)
3. ¡Tu backend estará en vivo! 🎉

La URL será algo como: `https://meli-search-backend.onrender.com`

---

## 🔄 Actualizar Variables de Entorno

### Frontend (Vercel)

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Actualiza `NEXT_PUBLIC_API_URL` con la URL de Render:
   ```
   NEXT_PUBLIC_API_URL=https://meli-search-backend.onrender.com
   ```
4. Redeploy: Deployments → (último deploy) → "..." → Redeploy

### Backend (Render)

1. Ve a tu servicio en Render
2. Environment
3. Actualiza `CORS_ORIGIN` con la URL de Vercel:
   ```
   CORS_ORIGIN=https://meli-search-frontend.vercel.app
   ```
4. Render se redespliegará automáticamente

---

## ✅ Verificación

### Backend

Visita: `https://tu-backend.onrender.com/api`

Deberías ver la documentación de Swagger.

### Frontend

Visita: `https://tu-frontend.vercel.app`

Deberías ver la página principal con la búsqueda funcionando.

---

## ⚠️ Limitaciones del Plan Gratuito

### Vercel

- ✅ 100 GB de ancho de banda/mes
- ✅ Despliegues ilimitados
- ✅ Sin "sleep"

### Render

- ⚠️ El servicio se "duerme" después de 15 minutos de inactividad
- ⚠️ El primer request después del sleep tarda ~30 segundos
- ✅ 750 horas gratis/mes (suficiente para uso personal)

---

## 🔧 Troubleshooting

### Error de CORS

Si ves errores de CORS en el navegador:

1. Verifica que `CORS_ORIGIN` en el backend tenga la URL correcta de Vercel
2. Asegúrate de que NO haya `/` al final de la URL
3. Redespliega el backend

### Backend no responde

Si el backend tarda mucho:

- Es normal en el plan gratuito después de inactividad
- El primer request despierta el servicio (~30s)
- Los siguientes requests serán rápidos

### Frontend no conecta con Backend

1. Verifica que `NEXT_PUBLIC_API_URL` esté configurada
2. Asegúrate de que la URL del backend sea correcta
3. Redespliega el frontend después de cambiar variables

---

## 📝 URLs de Ejemplo

Después del despliegue, tus URLs serán:

- **Frontend**: `https://meli-search-[tu-usuario].vercel.app`
- **Backend**: `https://meli-search-backend.onrender.com`
- **Swagger**: `https://meli-search-backend.onrender.com/api`

---

## 🎯 Próximos Pasos

1. Despliega el backend primero
2. Copia la URL del backend
3. Despliega el frontend con la URL del backend
4. Copia la URL del frontend
5. Actualiza CORS_ORIGIN en el backend
6. ¡Listo! 🚀
