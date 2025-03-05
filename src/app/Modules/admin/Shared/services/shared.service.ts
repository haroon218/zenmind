import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environments.dev';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //sharedData to store the application state mainly to store the current login user
  sharedData = new BehaviorSubject <any>({});
  //sharedData$ for making the sharedData observable which reflect the updated data of state
  public sharedData$: Observable<any> = this.sharedData.asObservable();
  constructor() { 
    this.getData()
  }
  public getData() {
    let storedData = sessionStorage.getItem('Data@Salvao');
    //pick the data from the local 
    this.sharedData.next(JSON.parse(storedData || '{}'));
  }
}
