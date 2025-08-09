# Guía de Solución para Errores 400 y 500

## 🔍 **Problema Identificado:**
- **Error 500** al crear materiales
- **Error 400** al ver materiales
- Problemas de formato de datos entre cliente y servidor

## 🛠️ **Soluciones Implementadas:**

### **1. Formato de Datos Corregido**
```typescript
// ❌ Antes (formato incorrecto):
{
  "name": "Tornillos M6",
  "description": "Tornillos de acero",
  "cantidad": 50
}

// ✅ Ahora (formato correcto):
{
  "celda": 1,
  "materiales": {
    "name": "Tornillos M6",
    "description": "Tornillos de acero inoxidable",
    "cantidad": 50,
    "ubicacion": "Pasillo A-3",
    "movimientos": ["entrada"]
  }
}
```

### **2. Validación de Datos**
- ✅ **Validación antes de enviar** al servidor
- ✅ **Conversión de tipos** (string a number)
- ✅ **Verificación de campos obligatorios**
- ✅ **Formato correcto de movimientos**

### **3. Manejo Mejorado de Errores**
- ✅ **Error 400:** Datos incorrectos o formato inválido
- ✅ **Error 500:** Error interno del servidor
- ✅ **Mensajes específicos** para cada tipo de error
- ✅ **Logs detallados** para debugging

## 🔧 **Diagnóstico de Errores:**

### **Error 400 - Bad Request:**
```javascript
// Causas comunes:
1. Formato de datos incorrecto
2. Campos obligatorios faltantes
3. Tipos de datos incorrectos
4. URL mal formada

// Solución:
1. Verificar el formato de datos enviados
2. Asegurar que todos los campos requeridos estén presentes
3. Convertir tipos de datos correctamente
4. Verificar las URLs en environment.ts
```

### **Error 500 - Internal Server Error:**
```javascript
// Causas comunes:
1. Error en el servidor al procesar los datos
2. Problemas de base de datos
3. Validación fallida en el servidor
4. Problemas de configuración del servidor

// Solución:
1. Verificar los logs del servidor
2. Asegurar que el formato de datos sea correcto
3. Verificar la conectividad de la base de datos
4. Contactar al administrador del servidor
```

## 📋 **Checklist de Verificación:**

### **✅ Antes de Crear Material:**
- [ ] ¿El formato de datos es correcto?
- [ ] ¿Todos los campos obligatorios están presentes?
- [ ] ¿Los tipos de datos son correctos?
- [ ] ¿El token de autenticación es válido?

### **✅ Para Ver Materiales:**
- [ ] ¿La URL del endpoint es correcta?
- [ ] ¿El servidor está ejecutándose?
- [ ] ¿No hay problemas de CORS?
- [ ] ¿El token tiene permisos de lectura?

### **✅ Para Debugging:**
- [ ] ¿Los logs en la consola muestran información útil?
- [ ] ¿Los datos enviados tienen el formato correcto?
- [ ] ¿La respuesta del servidor es clara?
- [ ] ¿Los mensajes de error son informativos?

## 🚨 **Casos Específicos y Soluciones:**

### **Caso 1: Error 400 al Crear Material**
```javascript
// Problema:
Error 400: Datos incorrectos. Verifica el formato de los datos enviados.

// Solución:
1. Verificar que el formato sea:
   {
     "celda": 1,
     "materiales": {
       "name": "string",
       "description": "string", 
       "cantidad": number,
       "ubicacion": "string",
       "movimientos": ["string"]
     }
   }
2. Asegurar que cantidad sea un número
3. Verificar que movimientos sea un array
```

### **Caso 2: Error 500 al Crear Material**
```javascript
// Problema:
Error 500: Error interno del servidor. Verifica los datos enviados.

// Solución:
1. Verificar que todos los campos estén completos
2. Asegurar que los tipos de datos sean correctos
3. Verificar que no haya caracteres especiales problemáticos
4. Revisar los logs del servidor
```

### **Caso 3: Error 400 al Ver Materiales**
```javascript
// Problema:
Error 400: Solicitud incorrecta. Verifica el formato de los datos.

// Solución:
1. Verificar que la URL del endpoint sea correcta
2. Asegurar que el token de autenticación sea válido
3. Verificar que no haya parámetros incorrectos
4. Revisar la configuración del interceptor
```

### **Caso 4: Error 500 al Ver Materiales**
```javascript
// Problema:
Error 500: Error interno del servidor. Contacta al administrador.

// Solución:
1. Verificar que el servidor esté funcionando correctamente
2. Revisar los logs del servidor
3. Verificar la conectividad de la base de datos
4. Contactar al administrador del sistema
```

## 🔍 **Comandos de Debug Útiles:**

### **En la Consola del Navegador:**
```javascript
// Verificar datos antes de enviar
console.log('Datos a enviar:', materialData);

// Verificar respuesta del servidor
console.log('Respuesta del servidor:', response);

// Verificar error completo
console.log('Error completo:', error);
console.log('Status:', error.status);
console.log('Message:', error.message);
```

### **En el Servidor (si tienes acceso):**
```bash
# Verificar logs del servidor
tail -f server.log

# Verificar que el servidor esté ejecutándose
curl http://localhost:3000/health

# Probar endpoint manualmente
curl -X POST http://localhost:3000/materiales \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"celda":1,"materiales":{"name":"Test","description":"Test","cantidad":1,"ubicacion":"Test","movimientos":["entrada"]}}'
```

## 📝 **Logs Esperados:**

### **✅ Creación Exitosa:**
```
🔍 Debug - Creando material: {celda: 1, materiales: {...}}
🔍 Debug - URL: http://localhost:3000/materiales
🔍 Debug - Datos a enviar: {celda: 1, materiales: {...}}
🔍 Debug - Material creado: {success: true, message: "..."}
```

### **✅ Obtención Exitosa:**
```
🔍 Debug - Obteniendo todos los materiales
🔍 Debug - URL: http://localhost:3000/materiales/all
🔍 Debug - Respuesta del servidor: {success: true, data: [...]}
```

### **❌ Error 400:**
```
🔍 Debug - Error al crear material: {status: 400, message: "..."}
🔍 Debug - Status: 400
🔍 Debug - Error completo: {...}
Error 400: Datos incorrectos. Verifica el formato de los datos enviados.
```

### **❌ Error 500:**
```
🔍 Debug - Error al crear material: {status: 500, message: "..."}
🔍 Debug - Status: 500
🔍 Debug - Error completo: {...}
Error 500: Error interno del servidor. Verifica los datos enviados.
```

## 🎯 **Resumen de Acciones:**

1. **Verifica el formato de datos** antes de enviar
2. **Asegura que todos los campos** estén presentes
3. **Convierte tipos de datos** correctamente
4. **Revisa los logs** en la consola para información detallada
5. **Verifica la conectividad** con el servidor
6. **Contacta al administrador** si los errores persisten

Con estas mejoras, deberías poder identificar y solucionar los errores 400 y 500 más fácilmente. 