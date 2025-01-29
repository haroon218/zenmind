import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }
  private apiUrl = '';

  sendGetRequest(url:string):Observable<any>{
    return this.http.get(this.apiUrl+url);
  }

}