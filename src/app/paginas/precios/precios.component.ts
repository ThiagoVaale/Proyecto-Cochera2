import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { DataTarifasServices } from '../../services/data-tarifas.service';


@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './precios.component.html',
  styleUrl: './precios.component.scss'
})
export class PreciosComponent {
  esAdmin = true
  dataTarifasServices = inject(DataTarifasServices)
  
  UpdatePrice(rateId: string) {
    Swal.fire({
      title: "Actualizar precio de tarifa",
      html: `<input type="text" id="nuevoPrecio" class="swal2-input" placeholder="Ingrese nuevo precio">`,
      showCancelButton: true,
      confirmButtonText: "Actualizar precio",
      cancelButtonText: "Cancelar",
      willOpen: () => {
        const titleEl = document.querySelector('.swal2-title') as HTMLElement;
        const contentEl = document.querySelector('.swal2-html-container') as HTMLElement;
        const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
        if (titleEl) {
          titleEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        }
        if (contentEl) {
          contentEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        }
        if (confirmButton){
          confirmButton.style.backgroundColor ="#ffd000";
        }
      },
      preConfirm: () => {
        const nuevoPrecioInput = document.getElementById("nuevoPrecio") as HTMLInputElement;
        if (!nuevoPrecioInput || !nuevoPrecioInput.value) {
          Swal.showValidationMessage("Por favor, ingrese un precio válido");
          return false;
        }
        return { nuevoPrecio: nuevoPrecioInput.value };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { nuevoPrecio } = result.value;
        await this.dataTarifasServices.UpdateTarifas(rateId, nuevoPrecio);
      }
    });
  }
}
