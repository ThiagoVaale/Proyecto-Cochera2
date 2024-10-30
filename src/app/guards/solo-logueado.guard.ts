import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { DataAuthService } from '../services/data-auth.service';
import { stringify } from 'querystring';
import { Token } from '@angular/compiler';

export const soloLogueadoGuard: CanActivateFn = (route, state) => {
  const dataAuthService = inject(DataAuthService);
  const router = inject(Router);

  if (dataAuthService.usuario?.token) return true;
  const url = router.parseUrl('/Acceso');
  return new RedirectCommand(url);
}
