import { Routes } from '@angular/router';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { RoleComponent } from './user/role/role.component';
import { PermissionComponent } from './user/permission/permission.component';

export default [
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: 'role', component: RoleComponent },
    { path: 'permission', component: PermissionComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
