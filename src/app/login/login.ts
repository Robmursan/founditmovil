import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login as LoginService } from '../servicios/login';//importamos el servicio de login
import { Router } from '@angular/router'; //importamos el router para poder redirigir a la pagina de inicio


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  usuario = {
    email:'',
    password:''
  }

  constructor(private loginService: LoginService, private router: Router){}//constructor del componente login con el servicio de login y el router

  login(){
    this.loginService.login(this.usuario).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        alert('Login exitoso / Login successful: ' + res.mensaje)
        // Redirigir a create-material después del login exitoso
        // Redirect to create-material after successful login
        this.router.navigate(['/create-material']);
      },
      err => {
        alert('Error al iniciar sesión / Login error: ' + err.error.mensaje)
      }
    )
  }

}
