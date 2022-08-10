import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearofertaComponent } from './ofertas/components/crearoferta/crearoferta.component';
import { LoginComponent} from './usuario/components/login/login.component';
import { BuscarofertaComponent } from './ofertas/components/valoraroferta/buscaroferta/buscaroferta.component';
import { MenuComponent } from './usuario/components/menu/menu.component';
import { SectorizacionComponent } from './ofertas/components/valoraroferta/sectorizacion/sectorizacion.component';

const routes: Routes = [
  {
    path: 'crearoferta',
    component: CrearofertaComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'buscaroferta',
    component: BuscarofertaComponent
  },
  {
    path: 'menu',
    component: MenuComponent
},
{
    path: 'sectorizaoferta',
    component: SectorizacionComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
