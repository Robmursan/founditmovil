import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Materiales } from './materiales/materiales';
import { CreateMaterial } from './create-material/create-material';
import { loginGuard } from './guards/login-guard';
import { Codelector } from './codelector/codelector';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { 
        path: 'materiales', 
        component: Materiales,
        canActivate: [loginGuard]
    },
    { 
        path: 'create-material', 
        component: CreateMaterial,
        canActivate: [loginGuard]
    },
    { path: 'codelector', component: Codelector }, // Movida antes del wildcard
    { path: '**', redirectTo: '/login' } // Wildcard debe ir al final
];
