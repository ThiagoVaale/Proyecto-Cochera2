import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login, ResLogin } from '../../interfaces/login';
import { DataAuthService } from '../../services/data-auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})

export class InicioComponent{

  authService = inject(DataAuthService);  

  // loginData: Login = {
  //   username: "admin",
  //   password: "admin"
  // }

  router = inject(Router);

  errorLogin = false; //Inicializamos el LOGIN en FALSE.
  async login(loginForm: NgForm){ //Recibimos un formulario NgForm.
  const {username, password} = loginForm.value; //Desectructuramos el valor del formulario, donde aca vamos a asignar valores especificos.
  const loginData = {username, password};

  const res = await this.authService.login(loginData)

  if(res?.statusText === "OK") this.router.navigate(["/estado-cocheras"]); //Si el status code del authService es "ok" navega hasta estadococheras.
  else this.errorLogin = true;
}
}
