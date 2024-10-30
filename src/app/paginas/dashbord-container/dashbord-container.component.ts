import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DataAuthService } from '../../services/data-auth.service';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashbord-container',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashbord-container.component.html',
  styleUrl: './dashbord-container.component.scss'
})
export class DashbordContainerComponent {
  esAdmin = true;
  authService = inject(DataAuthService);
  router = inject(Router)

  cerrarSesion(){
    this.authService.clearToken();
    this.router.navigate(["/Acceso"])
  }
}
