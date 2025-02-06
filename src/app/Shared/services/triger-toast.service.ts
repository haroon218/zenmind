import { Injectable } from '@angular/core';
import { Toast } from 'primeng/toast';
import { BehaviorSubject } from 'rxjs';
import { ToastObj } from '../interface/Toast.interface';

@Injectable({
  providedIn: 'root'
})
export class TrigerToastService {
  private showTaostMessage = new BehaviorSubject<ToastObj| any>(null)
  constructor() { }

  showToast(data:ToastObj){
    this.showTaostMessage.next(data);
  }

  getToastMessage(){
    return this.showTaostMessage.asObservable();
  }


}
