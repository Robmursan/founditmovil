# Servicio de Materiales - Documentación

## Descripción
Este servicio permite gestionar materiales en el sistema FoundIt Móvil, proporcionando operaciones CRUD completas para interactuar con la API de materiales.

## Endpoints Implementados

### 1. GET /materiales/all
**Descripción:** Obtiene todos los materiales disponibles.

**Uso:**
```typescript
this.materialesService.getAllMateriales().subscribe({
  next: (response) => {
    console.log('Materiales:', response.data);
  },
  error: (error) => {
    console.error('Error:', error);
  }
});
```

### 2. GET /materiales/name/:name
**Descripción:** Busca materiales por nombre.

**Uso:**
```typescript
this.materialesService.getMaterialesByName('Tornillos').subscribe({
  next: (response) => {
    console.log('Materiales encontrados:', response.data);
  },
  error: (error) => {
    console.error('Error:', error);
  }
});
```

### 3. POST /materiales
**Descripción:** Agrega un nuevo material.

**Uso:**
```typescript
const nuevoMaterial: Material = {
  celda: 1,
  materiales: {
    name: "Tornillos M6",
    description: "Tornillos de acero inoxidable",
    cantidad: 50,
    ubicacion: "Pasillo A-3",
    movimientos: ["entrada"]
  }
};

this.materialesService.createMaterial(nuevoMaterial).subscribe({
  next: (response) => {
    console.log('Material creado:', response.message);
  },
  error: (error) => {
    console.error('Error:', error);
  }
});
```

### 4. PUT /materiales/id/:id
**Descripción:** Actualiza la información de un material existente.

**Uso:**
```typescript
const materialActualizado = {
  materiales: {
    cantidad: 75,
    ubicacion: "Pasillo B-2"
  }
};

this.materialesService.updateMaterial('123', materialActualizado).subscribe({
  next: (response) => {
    console.log('Material actualizado:', response.message);
  },
  error: (error) => {
    console.error('Error:', error);
  }
});
```

### 5. DELETE /materiales/:id
**Descripción:** Elimina un material por ID.

**Uso:**
```typescript
this.materialesService.deleteMaterial('123').subscribe({
  next: (response) => {
    console.log('Material eliminado:', response.message);
  },
  error: (error) => {
    console.error('Error:', error);
  }
});
```

## Interfaces TypeScript

### Material
```typescript
export interface Material {
  celda: number;
  materiales: {
    name: string;
    description: string;
    cantidad: number;
    ubicacion: string;
    movimientos: string[];
  };
}
```

### MaterialResponse
```typescript
export interface MaterialResponse {
  success: boolean;
  message: string;
  data?: Material | Material[];
}
```

## Características del Servicio

### 1. Interceptor de Token
- El servicio utiliza automáticamente el interceptor de token para incluir el token de autorización en todas las peticiones.
- El token se obtiene del servicio de autenticación.

### 2. Manejo de Errores
- Todas las operaciones incluyen manejo de errores con try-catch.
- Los errores se registran en la consola para debugging.

### 3. Tipado Fuerte
- Todas las interfaces están tipadas para garantizar la integridad de los datos.
- TypeScript proporciona autocompletado y validación en tiempo de compilación.

## Uso en Componentes

### Inyección del Servicio
```typescript
import { MaterialesService } from '../servicios/materiales';

constructor(private materialesService: MaterialesService) {}
```

### Ejemplo de Componente Completo
```typescript
export class MaterialesComponent implements OnInit {
  materiales: Material[] = [];
  loading = false;

  constructor(private materialesService: MaterialesService) {}

  ngOnInit() {
    this.cargarMateriales();
  }

  cargarMateriales() {
    this.loading = true;
    this.materialesService.getAllMateriales().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.materiales = Array.isArray(response.data) ? response.data : [response.data];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar materiales:', error);
        this.loading = false;
      }
    });
  }
}
```

## Permisos y Seguridad

### Endpoints Públicos
- `GET /materiales/all` - Todos los usuarios
- `GET /materiales/name/:name` - Todos los usuarios
- `POST /materiales` - Todos los usuarios
- `PUT /materiales/id/:id` - Todos los usuarios

### Endpoints Restringidos
- `DELETE /materiales/:id` - Solo usuarios tipo admin

## Configuración del Interceptor

El interceptor de token está configurado en `app.config.ts`:

```typescript
provideHttpClient(
  withInterceptors([TokenInterceptor])
)
```

Esto asegura que todas las peticiones HTTP incluyan automáticamente el token de autorización en los headers.

## Flujo de Navegación

### Después del Login Exitoso
1. El usuario inicia sesión en `/iniciosesion`
2. Al autenticarse correctamente, se redirige automáticamente a `/materiales`
3. El componente de materiales se carga con el token de autorización

## Notas Importantes

1. **URL Base:** El servicio utiliza la URL base `http://localhost:3000/materiales`
2. **Headers:** El interceptor agrega automáticamente el header `Authorization: Bearer {token}`
3. **Respuestas:** Todas las respuestas siguen el formato `MaterialResponse`
4. **Errores:** Los errores de red se manejan en el componente que consume el servicio
5. **Redirección:** Después del login exitoso, el usuario es redirigido automáticamente a la página de materiales

## Troubleshooting

### Error 401 (Unauthorized)
- Verificar que el token esté presente y válido
- Revisar que el usuario esté autenticado

### Error 403 (Forbidden)
- Verificar permisos de usuario para operaciones DELETE
- Solo usuarios admin pueden eliminar materiales

### Error 404 (Not Found)
- Verificar que el ID del material exista
- Revisar la URL del endpoint

### Error 500 (Server Error)
- Verificar el formato de los datos enviados
- Revisar logs del servidor para más detalles

### Problemas de Conexión
- Verificar que el servidor esté ejecutándose en `localhost:3000`
- Comprobar que no haya problemas de CORS
- Verificar que el puerto 3000 esté disponible 