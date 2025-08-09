# Guía de Debugging del Sistema de Autenticación

## 🔍 **Problema Identificado:**
El sistema reporta que no hay token, lo que causa errores 403 en las peticiones a la API.

## 🛠️ **Mejoras Implementadas:**

### **1. Servicio de Inicio de Sesión Mejorado**
- ✅ **Debugging completo** en el proceso de login
- ✅ **Manejo de múltiples formatos** de respuesta del servidor
- ✅ **Verificación automática** del token después del login
- ✅ **Limpieza automática** de tokens inválidos

### **2. Componente de Login Mejorado**
- ✅ **Mensajes de estado** en tiempo real
- ✅ **Indicador de loading** durante el proceso
- ✅ **Verificación de token** después del login
- ✅ **Redirección automática** solo si el token es válido

### **3. Interceptor Mejorado**
- ✅ **Debugging detallado** de cada petición
- ✅ **Verificación de token** antes de agregar headers
- ✅ **Logs informativos** para diagnóstico

### **4. Interfaz de Debug**
- ✅ **Información en tiempo real** del estado del token
- ✅ **URL del servidor** visible
- ✅ **Estado de autenticación** visible
- ✅ **Validez del token** visible

## 🔧 **Pasos para Probar el Sistema:**

### **Paso 1: Verificar el Servidor**
1. **Asegúrate de que el servidor esté ejecutándose** en `localhost:3000`
2. **Verifica que el endpoint de login** esté disponible: `http://localhost:3000/login`

### **Paso 2: Probar el Login**
1. **Ve a la página de login** (`/iniciosesion`)
2. **Revisa la sección de Debug Info** en la parte inferior
3. **Ingresa credenciales válidas**
4. **Observa los logs en la consola** (F12)

### **Paso 3: Verificar el Token**
1. **Después del login exitoso**, revisa la consola
2. **Busca estos logs:**
   ```
   🔍 Debug - Token encontrado: [token]
   🔍 Debug - Token guardado en localStorage
   🔍 Debug - Token válido, redirigiendo a materiales
   ```

### **Paso 4: Probar la API**
1. **Ve a la página de materiales** (`/materiales`)
2. **Usa los botones de debug** para verificar el estado
3. **Revisa los logs del interceptor** en la consola

## 📋 **Checklist de Verificación:**

### **✅ Antes del Login:**
- [ ] ¿El servidor está ejecutándose en `localhost:3000`?
- [ ] ¿La URL de login es correcta?
- [ ] ¿No hay token en localStorage?
- [ ] ¿El estado de autenticación es "No"?

### **✅ Durante el Login:**
- [ ] ¿Se muestran los logs de debugging?
- [ ] ¿La petición se envía correctamente?
- [ ] ¿Se recibe respuesta del servidor?
- [ ] ¿Se encuentra el token en la respuesta?

### **✅ Después del Login:**
- [ ] ¿Se guarda el token en localStorage?
- [ ] ¿El token es válido (formato correcto)?
- [ ] ¿El token no está expirado?
- [ ] ¿Se redirige a materiales?

### **✅ En la Página de Materiales:**
- [ ] ¿El interceptor agrega el token a los headers?
- [ ] ¿Las peticiones incluyen Authorization header?
- [ ] ¿No hay errores 403?

## 🚨 **Casos Comunes y Soluciones:**

### **Caso 1: No se recibe token del servidor**
```javascript
// Problema:
🔍 Debug - No se encontró token en la respuesta

// Solución:
1. Verifica el formato de respuesta del servidor
2. Revisa los logs para ver la estructura completa
3. Ajusta el código según el formato real
```

### **Caso 2: Token mal formateado**
```javascript
// Problema:
🔍 Debug - Token mal formateado

// Solución:
1. Verifica que el servidor envíe JWT válido
2. El token debe tener 3 partes separadas por puntos
3. Ejemplo: header.payload.signature
```

### **Caso 3: Token expirado**
```javascript
// Problema:
🔍 Debug - Token expirado: true

// Solución:
1. El token se elimina automáticamente
2. Ve al login y autentícate nuevamente
```

### **Caso 4: Error de conexión**
```javascript
// Problema:
Error de conexión: No se puede conectar al servidor

// Solución:
1. Verifica que el servidor esté ejecutándose
2. Verifica la URL en environment.ts
3. Verifica que no haya problemas de CORS
```

## 🔍 **Comandos de Debug Útiles:**

### **En la Consola del Navegador:**
```javascript
// Verificar token actual
localStorage.getItem('token')

// Verificar si hay token
!!localStorage.getItem('token')

// Limpiar token manualmente
localStorage.removeItem('token')

// Verificar todos los datos en localStorage
console.log(localStorage)

// Verificar si el servidor responde
fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test', password: 'test' })
}).then(r => console.log(r))
```

### **En el Servidor (si tienes acceso):**
```bash
# Verificar que el servidor esté ejecutándose
curl http://localhost:3000/health

# Verificar logs del servidor
tail -f server.log

# Verificar puerto 3000
netstat -tulpn | grep :3000
```

## 📝 **Logs Esperados:**

### **✅ Login Exitoso:**
```
🔍 Debug - Intentando login con: {email: "...", password: "..."}
🔍 Debug - URL de login: http://localhost:3000/login
🔍 Debug - Respuesta del servidor: {jwt: "..."}
🔍 Debug - Token encontrado: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
🔍 Debug - Token guardado en localStorage
🔍 Debug - Token válido, redirigiendo a materiales
```

### **✅ Interceptor Funcionando:**
```
🔍 Debug - Interceptor - URL: http://localhost:3000/materiales/all
🔍 Debug - Interceptor - Token disponible: true
🔍 Debug - Interceptor - Agregando token a headers
```

### **❌ Login Fallido:**
```
🔍 Debug - Error en login: {status: 401, message: "..."}
🔍 Debug - No se encontró token en la respuesta
```

## 🎯 **Resumen de Acciones:**

1. **Verifica que el servidor esté ejecutándose** en `localhost:3000`
2. **Usa la interfaz de debug** para monitorear el estado
3. **Revisa los logs en la consola** para información detallada
4. **Prueba el login** con credenciales válidas
5. **Verifica que el token se guarde** correctamente
6. **Prueba las peticiones** a la API de materiales

Con estas mejoras, deberías poder identificar exactamente dónde está el problema en el proceso de autenticación. 