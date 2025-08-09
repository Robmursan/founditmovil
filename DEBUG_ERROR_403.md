# Guía de Diagnóstico y Solución del Error 403

## 🔍 **Diagnóstico del Error 403**

### **Problema Identificado:**
El error 403 (Forbidden) indica que el servidor está rechazando la petición por falta de permisos. En tu caso, el problema principal es que el token está `undefined` o mal formateado.

### **Síntomas Detectados:**
```
🔍 Debug - Token actual: undefined
🔍 Debug - Token válido: true  // ❌ Esto está mal
🔍 Debug - Error al decodificar token: InvalidCharacterError
```

## 🛠️ **Soluciones Implementadas**

### **1. Verificación Mejorada del Token**
```typescript
// Antes (problemático):
console.log('🔍 Debug - Token válido:', !!token);

// Ahora (correcto):
console.log('🔍 Debug - Token válido:', !!token && token !== 'undefined' && token !== 'null');
```

### **2. Limpieza Automática de Tokens Inválidos**
- ✅ **Token undefined:** Se elimina automáticamente
- ✅ **Token "undefined":** Se elimina automáticamente  
- ✅ **Token "null":** Se elimina automáticamente
- ✅ **Token mal formateado:** Se elimina automáticamente

### **3. Botones de Debug Disponibles**

#### **🔍 Probar Conexión**
- Prueba la conexión sin interceptor
- Verifica si el problema es del token o del servidor

#### **🔍 Verificar Token**
- Analiza el token actual
- Muestra información detallada del payload
- Verifica si está expirado

#### **🧹 Limpiar Token**
- Elimina tokens inválidos del localStorage
- Limpia automáticamente tokens mal formateados

#### **🔐 Ir al Login**
- Elimina el token actual
- Redirige al formulario de login

## 🔧 **Pasos para Solucionar el Error 403**

### **Paso 1: Verificar el Token**
1. Abre la consola del navegador (F12)
2. Haz clic en **"🔍 Verificar Token"**
3. Revisa los logs en la consola

### **Paso 2: Limpiar Token Inválido**
1. Si el token es `undefined` o inválido
2. Haz clic en **"🧹 Limpiar Token"**
3. Verifica que se haya eliminado

### **Paso 3: Ir al Login**
1. Haz clic en **"🔐 Ir al Login"**
2. Inicia sesión nuevamente
3. Verifica que el token se guarde correctamente

### **Paso 4: Probar Conexión**
1. Después del login exitoso
2. Haz clic en **"🔍 Probar Conexión"**
3. Verifica que la conexión funcione

## 📋 **Checklist de Diagnóstico**

### **✅ Verificaciones Básicas:**
- [ ] ¿El servidor está ejecutándose en `localhost:3000`?
- [ ] ¿El usuario está autenticado correctamente?
- [ ] ¿El token se guarda en localStorage después del login?
- [ ] ¿El token tiene el formato correcto (3 partes separadas por puntos)?

### **✅ Verificaciones Avanzadas:**
- [ ] ¿El token no está expirado?
- [ ] ¿El usuario tiene permisos para la operación?
- [ ] ¿No hay problemas de CORS?
- [ ] ¿El interceptor está funcionando correctamente?

## 🚨 **Casos Comunes y Soluciones**

### **Caso 1: Token undefined**
```javascript
// Problema:
🔍 Debug - Token actual: undefined
🔍 Debug - Token válido: true  // ❌ Incorrecto

// Solución:
1. Haz clic en "🧹 Limpiar Token"
2. Haz clic en "🔐 Ir al Login"
3. Inicia sesión nuevamente
```

### **Caso 2: Token mal formateado**
```javascript
// Problema:
🔍 Debug - Error al decodificar token: InvalidCharacterError

// Solución:
1. El token se elimina automáticamente
2. Ve al login y autentícate nuevamente
```

### **Caso 3: Token expirado**
```javascript
// Problema:
🔍 Debug - Token expirado: true

// Solución:
1. El token se elimina automáticamente
2. Ve al login y autentícate nuevamente
```

### **Caso 4: Permisos insuficientes**
```javascript
// Problema:
Error 403: No tienes permisos para eliminar materiales

// Solución:
1. Verifica que el usuario sea admin (para DELETE)
2. Contacta al administrador del sistema
```

## 🔍 **Comandos de Debug Útiles**

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

## 📝 **Logs de Debug Esperados**

### **✅ Token Válido:**
```
🔍 Debug - Token actual: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
🔍 Debug - Token válido: true
🔍 Debug - Payload del token: {sub: "123", exp: 1640995200, ...}
🔍 Debug - Token expira: 2022-01-01T00:00:00.000Z
🔍 Debug - Token expirado: false
```

### **❌ Token Inválido:**
```
🔍 Debug - Token actual: undefined
🔍 Debug - Token válido: false
🔍 Debug - ⚠️ No hay token o token inválido
```

### **❌ Token Mal Formateado:**
```
🔍 Debug - Token actual: invalid-token
🔍 Debug - Token válido: false
🔍 Debug - Token mal formateado: debe tener 3 partes separadas por puntos
🔍 Debug - ⚠️ Token inválido, eliminando del localStorage
```

## 🎯 **Resumen de Acciones**

1. **Usa los botones de debug** para diagnosticar el problema
2. **Limpia tokens inválidos** automáticamente
3. **Ve al login** si no estás autenticado
4. **Verifica permisos** si el error persiste
5. **Contacta al administrador** si necesitas permisos especiales

Con estas herramientas, deberías poder identificar y solucionar el error 403 rápidamente. 