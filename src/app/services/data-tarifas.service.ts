import { inject, Injectable } from '@angular/core';
import { Tarifa } from '../interfaces/tarifa';
import { DataAuthService } from './data-auth.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class DataTarifasServices{
    tarifas: Tarifa[] = []
    authService = inject(DataAuthService); 
    
    constructor() { 
        this.loadData()
      }

    async loadData(){
        await this.getTarifas()
        await this.UpdateTarifas
    }

    async getTarifas(){
        const res = await fetch(environment.API_URL+'tarifas',{
            headers: {
                authorization: "Bearer " +localStorage.getItem("authToken")
            },
        })
        if(res.status !== 200){
            console.log("Error")
        } else{
            this.tarifas = await res.json();
        }
    }
    async UpdateTarifas(descripcion: string, valor: string) {
        const body = {descripcion, valor};
        const res = await fetch(environment.API_URL+`tarifas/`+descripcion, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            authorization:'Bearer ' +  localStorage.getItem("authToken")
          },
          body: JSON.stringify(body) 
        });
      
        if (res.status !== 200) {
          console.log("Error al actualizar la tarifa");
        } else {
          console.log("Tarifa actualizada correctamente");
          this.loadData()
        }
      }
}