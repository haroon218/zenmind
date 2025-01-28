import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';

export default [
    { path: 'access', component: Access },
    { path: 'login', component: Login }
] as Routes;
