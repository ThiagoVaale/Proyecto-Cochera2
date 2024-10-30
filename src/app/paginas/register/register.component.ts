import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DataAuthService } from '../../services/data-auth.service';
import { Router } from '@angular/router';
import { Register } from '../../interfaces/register';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorRegister = false
  authService = inject(DataAuthService)
  router = inject(Router)

  async register(registerForm: NgForm){ //Recibimos un formulario NgForm.
    const {username, nombre, apellido, password} = registerForm.value; //Desectructuramos el valor del formulario, donde aca vamos a asignar valores especificos.
    const registerData : Register = {username, nombre, apellido, password}
    const res = await this.authService.register(registerData)
    if(res?.statusText === "Created") {
      this.router.navigate(["/Acceso"]).then(() =>{
        Swal.fire("Registro exitoso", "", "success");
      }) //Si el status code del authService es "ok" navega hasta estadococheras.
    } else this.errorRegister = true;
  }
}
