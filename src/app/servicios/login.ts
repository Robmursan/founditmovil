import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'

})
export class Login {
  private url = 'http://4.208.84.82:3000/login';//url de la api

  constructor(private http: HttpClient, private router: Router) {}
  
  login(usuario: object){
    return this.http.post<any>(this.url, usuario);
    
  }

}
