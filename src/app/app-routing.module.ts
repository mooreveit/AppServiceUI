import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/menu/main', pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'search-cliente',
    loadChildren: () => import('./pages/clientes/search-cliente/search-cliente.module').then(m => m.SearchClientePageModule)
  },
  {
    path: 'search-estado-cuenta',
    loadChildren: () => import('./pages/EstadoCuenta/search-estado-cuenta/search-estado-cuenta.module').then(m => m.SearchEstadoCuentaPageModule)
  },
  {
    path: 'search-contactos',
    loadChildren: () => import('./pages/clientes/search-contactos/search-contactos.module').then(m => m.SearchContactosPageModule)
  },
  {
    path: 'edit-detalle-cotizacion',
    loadChildren: () => import('./pages/Cotizaciones/cotizacion-detalle/edit/edit.module').then(m => m.EditPageModule)
  },
  {
    path: 'buscador-productos-criterios',
    loadChildren: () => import('./pages/Cotizaciones/cotizacion-detalle/buscador-productos/buscador-productos.module').then(m => m.BuscadorProductosPageModule)
  },
  {
    path: 'cotizacion-ganar-perder',
    loadChildren: () => import('./pages/Cotizaciones/cotizacion-ganar-perder/cotizacion-ganar-perder.module').then(m => m.CotizacionGanarPerderPageModule)
  },
  {
    path: 'cotizacion-delete',
    loadChildren: () => import('./pages/Cotizaciones/cotizacion-delete/cotizacion-delete.module').then(m => m.CotizacionDeletePageModule)
  },
  {
    path: 'cotizacion-postergar',
    loadChildren: () => import('./pages/Cotizaciones/cotizacion-postergar/cotizacion-postergar.module').then(m => m.CotizacionPostergarPageModule)
  },
  {
    path: 'direccion-list',
    loadChildren: () => import('./pages/direcciones/direccion-list/direccion-list.module').then(m => m.DireccionListPageModule)
  },
  {
    path: 'buscador-unidades',
    loadChildren: () => import('./pages/Cotizaciones/cotizacion-detalle/buscador-unidades/buscador-unidades.module').then(m => m.BuscadorUnidadesPageModule)
  },
  {
    path: 'calculadora',
    loadChildren: () => import('./pages/Cotizaciones/cotizacion-detalle/calculadora/calculadora.module').then(m => m.CalculadoraPageModule)
  },
  {
    path: 'calculadora-editor',
    loadChildren: () => import('./pages/Cotizaciones/cotizacion-detalle/calculadora-editor/calculadora-editor.module').then(m => m.CalculadoraEditorPageModule)
  },
  {
    path: 'search-existencia',
    loadChildren: () => import('./pages/productos/search-existencia/search-existencia.module').then( m => m.SearchExistenciaPageModule)
  }







];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
