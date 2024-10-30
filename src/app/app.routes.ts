import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { EstadoCocherasComponent } from './paginas/estado-cocheras/estado-cocheras.component';
import { NotFoundComponent } from './paginas/not-found/not-found.component';
import { DashbordContainerComponent } from './paginas/dashbord-container/dashbord-container.component';
import { ReportesComponent } from './paginas/reportes/reportes.component';
import { soloPublicoGuard } from './guards/solo-publico.guard';
import { soloLogueadoGuard } from './guards/solo-logueado.guard';
import { soloAdminGuard } from './guards/solo-admin.guard';
import { RegisterComponent } from './paginas/register/register.component';
import { PreciosComponent } from './paginas/precios/precios.component';


export const routes: Routes = [
    {
        path: "",
        component: DashbordContainerComponent,
        canActivate: [soloLogueadoGuard],
        children: [
            {
                path: "estado-cocheras",
                component: EstadoCocherasComponent
            },
            {
                path: "reportes",
                component: ReportesComponent,
                canActivate: [soloAdminGuard]
            },
            {
                path: "precios",
                component: PreciosComponent,
                canActivate: [soloAdminGuard]
            }
        ]
    },
    {
        path: "Acceso",
        component: InicioComponent,
        canActivate: [soloPublicoGuard]
    },
    {
        path: "Registro",
        component: RegisterComponent,
        canActivate: [soloPublicoGuard]
    },
    // {
    //     path: "",
    //     redirectTo: "Acceso",
    //     pathMatch: "full"
    // },
    {
        path: "not-found",
        component: NotFoundComponent
    },
    {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full"
    },
];
