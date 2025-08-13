import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Login as LoginService } from '../servicios/login';//importamos el servicio de login
import { Router } from '@angular/router'; //importamos el router para poder redirigir a la pagina de inicio


@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  usuario = {
    email:'',
    password:''
  }
  
  showSuccessMessage = false;
  showErrorMessage = false;
  errorMessage = '';

  constructor(private loginService: LoginService, private router: Router){}//constructor del componente login con el servicio de login y el router

  login(){
    this.loginService.login(this.usuario).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        // Mostrar mensaje de éxito estilizado
        this.showSuccessMessage = true;
        
        // Ocultar el mensaje después de 3 segundos y redirigir
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['/materiales']);
        }, 3000);
      },
      err => {
        // Mostrar notificación de error en lugar de alert
        this.errorMessage = err.error?.mensaje || 'Error al iniciar sesión. Verifica tus credenciales.';
        this.showErrorMessage = true;
        
        // Ocultar el mensaje de error después de 5 segundos
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 5000);
      }
    )
  }

  // Método para cerrar manualmente la notificación de error
  closeErrorMessage() {
    this.showErrorMessage = false;
  }

}
