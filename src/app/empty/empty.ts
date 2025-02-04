import { Component } from '@angular/core';
import { TrigerToastService } from '../Shared/services/triger-toast.service';
import { Button, ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-empty',
    standalone: true,
    imports:[ButtonModule],
    template: ` <div class="card">
        <div>
            <p-button label="Click me" (click)="onClick()">Success</p-button>
            <p-button label="Click me" (click)="onClick2()">Error</p-button>
            <p-button label="Click me" (click)="onClick3()">Info</p-button>
             
        </div>
        <div class="font-semibold text-xl mb-4">Empty Page</div>
        <p>Use this page to start from scratch and place your custom content.</p>
    </div>`
})
export class Empty {
    constructor(private trigerToastService: TrigerToastService) { }

    onClick(){
        this.trigerToastService.showToast({type:'success',shortMessage:'Success!',detail: 'Login Successfully!'})
    }
    onClick2(){
        this.trigerToastService.showToast({type:'error',shortMessage:'Error!',detail: 'Error Message!'})
    }
    onClick3(){
        this.trigerToastService.showToast({type:'Info',shortMessage:'Info!',detail: 'Info Message!'})
    }

}