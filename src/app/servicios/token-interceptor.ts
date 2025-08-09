import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'; 
import { Login as LoginService } from '../servicios/login';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor {
  constructor(private loginService: LoginService){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler){
    const token = localStorage.getItem('token')
    const tokenreq = req.clone({
        setHeaders:{
          'Authorization': `Bearer ${token}`
        }
      })
      return next.handle(tokenreq);
  }

  
}
