import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastComponent } from "./app/Shared/components/toast/toast.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ToastComponent],
    template: `
    <app-toast></app-toast>
    <router-outlet></router-outlet>
    `,
    
})
export class AppComponent {}
