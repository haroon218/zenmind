import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [ { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin/dashboard'] } ]
            },

            {
                label: 'Users',
                items: [
                    { label: 'Therapists', icon: 'pi pi-fw pi-user',routerLink: ['/admin/user/therapist'] },   // Represents a user (Therapist)
                    { label: 'Patients', icon: 'pi pi-fw pi-users',routerLink: ['/admin/user/patient'] }     // Represents multiple users (Patients)
                    
                    
                    // { label: 'Comp 3', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon'},
                    // { label: 'Comp 4', icon: 'pi pi-fw pi-table'},
             ]
            },

            {
                label: 'Auth',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    // {
                    //     label: 'Users',
                    //     icon: 'pi pi-users',
                    //     items: [
                    //         {
                    //             label: 'User',
                    //             icon: 'pi pi-fw pi-user',
                    //             routerLink: ['/user/crud']
                    //         },
                    //         {
                    //             label: 'Access Denied',
                    //             icon: 'pi pi-fw pi-lock',
                    //             routerLink: ['/access']
                    //         },
                    //         {
                    //             label: 'Roles',
                    //             icon: 'pi pi-shield',
                    //             routerLink: ['/user/role']
                    //         },
                    //         {
                    //             label: 'Permission',
                    //             icon: 'pi pi-fw pi-lock',
                    //             routerLink: ['/user/permission']
                    //         }
                    //     ]
                    // },
                    {
                                    label: 'Access Denied',
                                    icon: 'pi pi-fw pi-lock',
                                    routerLink: ['/access']
                                },
                                {
                                    label: 'Roles',
                                     icon: 'pi pi-shield',
                                    routerLink: ['/admin/auth/roles']
                                },
                                {
                                    label: 'Permission',
                                     icon: 'pi pi-fw pi-lock',
                                   routerLink: ['/admin/auth/permissions']
                               },
                    // {
                    //     label: 'Crud',
                    //     icon: 'pi pi-fw pi-pencil',
                    //     routerLink: ['/pages/crud']
                    // },
                    // {
                    //     label: 'Not Found',
                    //     icon: 'pi pi-fw pi-exclamation-circle',
                    //     routerLink: ['/user/notfound']
                    // },
                    // {
                    //     label: 'Empty',
                    //     icon: 'pi pi-fw pi-circle-off',
                    //     routerLink: ['/user/empty']
                    // }
                ]
            },

            // {
            //     label: 'Heading',
            //     items: [
            //         {
            //             label: 'Submenu 1',
            //             icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
            //                 }
            //             ]
            //         },
            //     ]
            // },

            // {
            //     label: 'More',
            //     items: [
            //         {
            //             label: 'Link 1',
            //             icon: 'pi pi-fw pi-book',
            //             // routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'Log Out',
            //             icon: 'pi pi-fw pi-github',
            //         }
            //     ]
            // }

        ];
    }
}
