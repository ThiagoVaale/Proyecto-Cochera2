import { inject, Injectable } from '@angular/core';
import { Cochera } from '../interfaces/cochera';
import { DataAuthService } from './data-auth.service';
import { Estacionamiento } from '../interfaces/estacionamiento';
import { environment } from '../../environments/environment';

  @Injectable({
    providedIn: 'root'
  })
  export class DataCocherasService {

    cocheras: Cochera[] = [] 
    estacionamientos: Estacionamiento[] = []
    authService = inject(DataAuthService);
    
    constructor() { 
      this.loadData();
    } 

    async loadData(){
      await this.getCocheras()
      await this.getEstacionamiento()
      this.asociarEstacionamientosConCocheras() //SIN await porque es un metodo convencional.
    }

    async getCocheras(){
      const res =  await fetch('http://localhost:5000/cocheras',{
        headers: {
          authorization:'Bearer '+localStorage.getItem("authToken")
        },
      })
        if(res.status !== 200 ) return;
        const resJson:Cochera[] = await res.json();
        this.cocheras = resJson;
    }
    async getEstacionamiento(){
    const res =  await fetch('http://localhost:5000/estacionamientos',{
      headers: {
        authorization:'Bearer ' +localStorage.getItem("authToken")
      },
    })
      if(res.status !== 200 ) return;
      const resJson:Estacionamiento[] = await res.json();
      this.estacionamientos = resJson;
  }

  asociarEstacionamientosConCocheras(){
    this.cocheras = this.cocheras.map(cochera => {
      const estacionamiento = this.estacionamientos.find(e => e.idCochera === cochera.id);
      return { ...cochera, estacionamiento }; // Retorna un nuevo objeto combinando cochera y estacionamiento
    });
  }

  ultimoNumero = this.cocheras[this.cocheras.length-1]?.id || 0;

    // actualizarCochera(){
    //   this.cocheras=[]
    // }

    async agregarCochera(nombreCochera: string){
      const cochera = {"descripcion" : nombreCochera}
      const res =  await fetch(environment.API_URL+'cocheras',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization:'Bearer ' +localStorage.getItem("authToken")
        },
        body: JSON.stringify(cochera)
      })
        if(res.status !== 200 ) {
          console.log("Error en la creacion de una nueva cochera")
        } else{
          console.log("Creacion de cochera exitosa")
          await this.loadData();
        };
    }

    async borrarFila(index:number){
      const res =  await fetch(environment.API_URL+`cocheras/${index}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization:'Bearer ' +localStorage.getItem("authToken")
        }
      })
        if(res.status !== 200 ) {
          console.log("Error en la eliminacion de la cochera")
        } else{
          console.log("Cochera eliminada con exito")
          this.loadData()
        };
    }

    borrarCochera(index: number){
      this.cocheras.splice(index, 1)  
    }

    async deshabilitarCochera(idCochera:number){
      const res = await fetch(environment.API_URL+'cocheras/'+idCochera+'/disable',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization:'Bearer '+localStorage.getItem("authToken")
        }
      })
      if (res.status === 200) {
        console.log('Cochera deshabilitada')
        this.loadData()
      } else {
        console.warn('Cochera eliminada con exito') 
      };
    }

    async habilitarCochera(idCochera:number){
      const res = await fetch(environment.API_URL+'cocheras/'+idCochera+'/enable',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization:'Bearer '+localStorage.getItem("authToken")
        },
      })
      if (res.status === 200) {
        console.log('Cochera habilitada')
        this.loadData()
      } else {
        console.log('Error habilitando cochera')
      }
    }

    async abrirEstacionamiento(patente: string, idUsuarioIngreso: string, idCochera: number){
      const body = {patente, idUsuarioIngreso, idCochera}
      const res = await fetch(environment.API_URL+'estacionamientos/abrir',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization:'Bearer '+localStorage.getItem("authToken")
        },
        body: JSON.stringify(body)
      })
      if (res.status !== 200) {
        console.log('Error en abrir estacionamiento')
      } else {
        console.log('Creacion de estacionamiento exitoso')
        this.loadData()
      };
    }

    async cerrarEstacionamiento(patente: string, idUsuarioEgreso: string){
      const body = {patente, idUsuarioEgreso}
      const res = await fetch(environment.API_URL+'estacionamientos/cerrar',{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization:'Bearer '+localStorage.getItem("authToken")
        },
      })
      if (res.status !== 200) {
        console.log('Error en cerrar estacionamiento')
      } else {
        console.log('Cerrado de estacionamiento')
        this.loadData()
      };
    }
  }