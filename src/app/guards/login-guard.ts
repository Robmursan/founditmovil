import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Verificar si existe un token en localStorage
  // Check if token exists in localStorage
  const token = localStorage.getItem('token');
  
  if (token) {
    // Si hay token, permitir acceso a la ruta
    // If token exists, allow access to the route
    return true;
  } else {
    // Si no hay token, redirigir al login
    // If no token, redirect to login
    router.navigate(['/login']);
    return false;
  }
};
