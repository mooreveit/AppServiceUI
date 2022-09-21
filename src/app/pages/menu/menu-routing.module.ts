import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { AuthGuard } from '../../guards/auth.guard';
const routes: Routes = [
    {
        path: '',
        redirectTo: '/menu/main',
        pathMatch: 'full'
       
    },
     {
        path: '',
        component: MenuPage,
        children: [
            {
                path: 'main', loadChildren: () => import('./../main/main.module').then(m => m.MainPageModule), canActivate: [AuthGuard]
            },
            {
                path: 'adjuntos-list', loadChildren: () => import('./../adjuntos/list/list.module').then(m => m.ListPageModule), canActivate: [AuthGuard]
            },
            {
                path: 'general-cobranza-list',
                loadChildren: () => import('./../cobranza/general-cobranza-list/general-cobranza-list.module').then(m => m.GeneralCobranzaListPageModule)
            },
            {
                path: 'cobranza-edit/:id',
                loadChildren: () => import('./../cobranza/cobranza-edit/cobranza-edit.module').then(m => m.CobranzaEditPageModule)
            },

            {
                path: 'grabacion-cobranza-list/:id',
                loadChildren: () => import('./../cobranza/grabacion-cobranza-list/grabacion-cobranza-list.module').then(m => m.GrabacionCobranzaListPageModule)
            },
            {
                path: 'grabacion-cobranza-edit',
                loadChildren: () => import('./../cobranza/grabacion-cobranza-edit/grabacion-cobranza-edit.module').then(m => m.GrabacionCobranzaEditPageModule)
            },
            {
                path: 'fotos',
                loadChildren: () => import('../adjuntos/fotos/fotos.module').then(m => m.FotosPageModule)
            },
            {
                path: 'fotos-web',
                loadChildren: () => import('../adjuntos/fotos-web/fotos-web.module').then(m => m.FotosWebPageModule)
            },
            {
                path: 'verificar-pago',
                loadChildren: () => import('./../cobranza/verificar-pago/verificar-pago.module').then(m => m.VerificarPagoPageModule)
            },
            {
                path: 'aprobar-cobranza',
                loadChildren: () => import('./../cobranza/aprobar-cobranza/aprobar-cobranza.module').then(m => m.AprobarCobranzaPageModule)
            },
            {
                path: 'retenciones-list/:id',
                loadChildren: () => import('./../cobranza/retenciones-list/retenciones-list.module').then(m => m.RetencionesListPageModule)
            },
            {
                path: 'retenciones-edit',
                loadChildren: () => import('./../cobranza/retenciones-edit/retenciones-edit.module').then(m => m.RetencionesEditPageModule)
            },
            {
                path: 'cotizaciones-list',
                loadChildren: () => import('./../Cotizaciones/cotizaciones-list/cotizaciones-list.module').then(m => m.CotizacionesListPageModule)
            },
            {
                path: 'cotizacion-edit',
                loadChildren: () => import('./../Cotizaciones/cotizacion-edit/cotizacion-edit.module').then(m => m.CotizacionEditPageModule)
            },

            {
                path: 'productos-list',
                loadChildren: () => import('./../productos/productos-list/productos-list.module').then(m => m.ProductosListPageModule)
            },
            {
                path: 'variables',
                loadChildren: () => import('../../pages/variables/variables.module').then(m => m.VariablesPageModule)
            },

            {
                path: 'ingredientes-list',
                loadChildren: () => import('../../pages/ingredientes/ingredientes-list/ingredientes-list.module').then(m => m.IngredientesListPageModule)
            },
            {
                path: 'configuracion-list',
                loadChildren: () => import('../../pages/configuracion-list/configuracion-list.module').then(m => m.ConfiguracionListPageModule)
            },
            {
                path: 'recetas-list',
                loadChildren: () => import('../../pages/recetas/recetas-list/recetas-list.module').then(m => m.RecetasListPageModule)
            },
            {
                path: 'recetas-edit',
                loadChildren: () => import('../../pages/recetas/recetas-edit/recetas-edit.module').then(m => m.RecetasEditPageModule)
            },
            {
                path: 'productos-edit',
                loadChildren: () => import('../../pages/productos/productos-edit/productos-edit.module').then(m => m.ProductosEditPageModule)
            },
            {
                path: 'ingredientes-edit',
                loadChildren: () => import('../../pages/ingredientes/ingredientes-edit/ingredientes-edit.module').then(m => m.IngredientesEditPageModule)
            },

            {
                path: 'template-conversion-unit-list',
                loadChildren: () => import('../../pages/TemplateConversionUnit/template-conversion-unit-list/template-conversion-unit-list.module').then(m => m.TemplateConversionUnitListPageModule)
            },

            {
                path: 'template-conversion-unit-edit',
                loadChildren: () => import('../../pages/TemplateConversionUnit/template-conversion-unit-edit/template-conversion-unit-edit.module').then(m => m.TemplateConversionUnitEditPageModule)
            },
            {
                path: 'copy-recetas',
                loadChildren: () => import('../../pages/recetas/copy-recetas/copy-recetas.module').then(m => m.CopyRecetasPageModule)
            },
            {
                path: 'imprimir-cotizacion',
                loadChildren: () => import('../../pages/cotizaciones/imprimir-cotizacion/imprimir-cotizacion.module').then(m => m.ImprimirCotizacionPageModule)
            },


            {
                path: 'list-detalle-cotizacion',
                loadChildren: () => import('./../Cotizaciones/cotizacion-detalle/list/list.module').then(m => m.ListPageModule)
            },
            {
                path: 'contactos-list',
                loadChildren: () => import('./../contactos/contactos-list/contactos-list.module').then(m => m.ContactosListPageModule)
            },
            {
                path: 'contactos-edit',
                loadChildren: () => import('./../contactos/contactos-edit/contactos-edit.module').then(m => m.ContactosEditPageModule)
            },
            {
                path: 'contactos-create',
                loadChildren: () => import('./../contactos/contactos-create/contactos-create.module').then(m => m.ContactosCreatePageModule)
            },
            {
                path: 'search',
                loadChildren: () => import('./../productos/search/search.module').then(m => m.SearchPageModule)
            },
            {
                path: 'search-existencia',
                loadChildren: () => import('./../productos/search-existencia/search-existencia.module').then(m => m.SearchExistenciaPageModule)
            },
            {
            path: 'price-list',
            loadChildren: () => import('../prices/price-list/price-list.module').then( m => m.PriceListPageModule)
            },
            {
                path:'app-buscador-productos',
                loadChildren: () => import('../Cotizaciones/cotizacion-detalle/buscador-productos/buscador-productos.module').then( m => m.BuscadorProductosPageModule)
                
            },
            {
            path: 'price-edit',
            loadChildren: () => import('../prices/price-edit/price-edit.module').then( m => m.PriceEditPageModule)
            },
            {
            path: 'repeticiones',
            loadChildren: () => import('../repeticiones/repeticiones/repeticiones.module').then( m => m.RepeticionesPageModule)
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MenuPageRoutingModule { }
