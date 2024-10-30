import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Login, ResLogin} from '../interfaces/login';
import { Register } from '../interfaces/register';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataAuthService {
  usuario: Usuario | undefined; //El usuario es tipo Usuario o Undefined.

  constructor() { 
    const token = this.getToken();
    if(token){
      if(!this.usuario) this.usuario={
        username: "",
        token: token,
        esAdmin: false
      }
      else this.usuario!.token = token;
    }
  }

  // LOGIN ASINCRONICO (MÉTODO MODERNO):

  // Función asincrónica que se encarga de autenticar al usuario. Envía una solicitud POST al servidor
  // con las credenciales del usuario (loginData).
  async login(loginData: Login) {
    // El FETCH manda una solicitud HTTP al servidor, en este caso el endpoint /login que maneja el backend.
    const res = await fetch(environment.API_URL+'login', {
      method: "POST",
      headers: {
        "Content-type": "application/json" // El header define que el cuerpo de la solicitud es un JSON.
      },
      body: JSON.stringify(loginData)
    });

    if (res.status !== 200) return; // Si el status code no devuelve un 200, devuelve un null.

    const resJson: ResLogin = await res.json(); // Convierte la respuesta en JSON.

    if (!resJson.token) return; // Si no hay token, no autenticado.

    this.usuario = {
      username: loginData.username,
      token: resJson.token,
      esAdmin: false // Valor por defecto, que será actualizado más adelante si es necesario.
    };

    localStorage.setItem("authToken", resJson.token);


    // Obtener detalles del usuario después de la autenticación exitosa.
    const userDetailsRes = await fetch(environment.API_URL+`usuarios/${encodeURIComponent(loginData.username)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${resJson.token}`,
        'Content-Type': 'application/json'
      }
    });

    if (userDetailsRes.status !== 200) return;

    const userDetailsResJson = await userDetailsRes.json();

    // Actualiza la propiedad 'esAdmin' en base a los detalles del usuario obtenidos.
    this.usuario.esAdmin = userDetailsResJson.esAdmin;

    return userDetailsRes; // Devuelve la respuesta JSON que incluye el token y el status.
  }

  // Método para registrar un nuevo usuario.
  async register(registerData: Register) {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(registerData)
    });

    if (res.status !== 201) return;
    return res; // Retorna la respuesta del registro.
  }

  getToken(){
    return localStorage.getItem("authToken")
  }

  clearToken(){
     localStorage.removeItem("authToken")
  }
}
 

