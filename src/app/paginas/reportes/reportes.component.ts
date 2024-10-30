import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataEstacionamientoService } from '../../services/data-estacionamientos.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {
  dataEstacionamientoService = inject(DataEstacionamientoService)
}