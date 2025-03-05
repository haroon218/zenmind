import { Routes } from '@angular/router';
import { AuthGuard } from './app/Modules/admin/Shared/Guards/AuthGuard';


export const appRoutes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' ,}, // Redirect to 'auth' on app start for the login if the user is not logged-in
    { 
        path: 'auth',
        loadChildren: () => import('./app/Modules/auth/auth.module').then(m => m.AuthModule),canActivate:[AuthGuard]
    },
    // after the auth login if the role is admin we redirect it to the admin module for further interaction
    { 
        path: 'admin',
        loadChildren: () => import('./app/Modules/admin/admin.module').then(m => m.AdminModule),canActivate:[AuthGuard]
    },
    // if the route not match with the above routes it will be redirected to the auth
    { path: '**', redirectTo: 'auth' } 
];
