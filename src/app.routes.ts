import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/dashboard/dashboard';
import { Notfound } from './app/notfound/notfound';
import { LoginComponent } from './app/auth/login/login.component';
import { Access } from './app/auth/access';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            // { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'pages', loadChildren: () => import('./app/pages.routes') },
        ]
    },
    
    { path: 'notfound', component:Notfound },
    { path: 'login',component:LoginComponent },
    { path: 'access',component:Access }
    // { path: '**', redirectTo: '/notfound' }
];
