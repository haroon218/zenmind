import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  sharedData = new BehaviorSubject({});
  constructor(private httpClient:HttpClient) { 
  }

  private token:string = '';

  private getToken() {
    let localStorageData = JSON.parse(
      sessionStorage.getItem(`sharedData@${environment.appName}`) || '{}'
    );
    if (localStorageData && localStorageData) {
      return localStorageData.waqas.role ?? null;
    }
    return null;
  }

   /** to insert data this.sharedService.insertData({ key: 'name', val: response.data }) **/
   public insertData(data: any) {
    this.sharedData.next({
      ...this.sharedData.getValue(),
      [data.key]: data.val,
    });
    sessionStorage.setItem(`sharedData@${environment.appName}`,JSON.stringify(this.sharedData.value));
  }

  public getData() {
    let storedData = sessionStorage.getItem(`sharedData@${environment.appName}`);
    this.sharedData.next(JSON.parse(storedData || '{}'));
    return this.sharedData.asObservable();
  }

  public sendGetRequest(target: string): Observable<any> {
    // let token = this.getToken();
    const headers_object = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.get<any>(environment.apiUrl + target, httpOptions)
  }
 
  /** Post Request without token auth **/
  public sendPostRequest(target: string, data: any): Observable<any> {
    const headers_object = new HttpHeaders({
      Authorization: `Bearer `,
    });
    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.post<any>(environment.apiUrl + target, data, httpOptions);
  }

   /** Post Request token auth **/
   public sendPostRequest2(target: string, data: any): Observable<any> {
    // let token = this.getToken();
    const headers_object = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.httpClient.post<any>(environment.apiUrl + target, data, httpOptions);
  }

}