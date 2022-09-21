import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';

import { IUsuario } from '../../interfaces/iusuario';
import { HttpClient } from '@angular/common/http';
import { PageMenu } from '../../models/page-menu-dto';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})


export class MenuPage implements OnInit {



    /*pages = [

        {
            role: 387,
            title: 'Main',
            url: '/menu/main',
            icon: 'home'
        },

        {
            role: 387,
            title: 'Cobranzas',
            children: [
                {
                    title: 'Cobranzas',
                    url: '/menu/general-cobranza-list',
                    icon: 'cash-outline'
                },
                {
                    title: 'Verificar Pago',
                    url: '/menu/verificar-pago',
                    icon: 'checkmark-outline'

                },
                {
                    title: 'Aprobar Cobranza',
                    url: '/menu/aprobar-cobranza',
                    icon: 'checkmark-done-outline'

                }
            ]
        },
        {
            role: 387,
            title: 'Cotizaciones',
            children: [
                {
                    title: 'Cotizaciones',
                    url: '/menu/cotizaciones-list',
                    icon: 'cash-outline'
                }
            ]
        },
        {
            role: 372,
            title: 'Main',
            url: '/menu/main',
            icon: 'home'
        },
        {
            role: 372,
            title: 'Cobranzas',
            children: [
                {
                    title: 'Cobranzas',
                    url: '/menu/general-cobranza-list',
                    icon: 'cash-outline'
                },
                {
                    title: 'Verificar Pago',
                    url: '/menu/verificar-pago',
                    icon: 'checkmark-outline'

                },
                {
                    title: 'Aprobar Cobranza',
                    url: '/menu/aprobar-cobranza',
                    icon: 'checkmark-done-outline'

                }
            ]
        },
        {
            role: 355,
            title: 'Main',
            url: '/menu/main',
            icon: 'home'
        },

        {
            role: 355,
            title: 'Cobranzas',
            children: [
                {
                    title: 'Cobranzas',
                    url: '/menu/general-cobranza-list',
                    icon: 'cash-outline'
                }
            ]
        },
        {
            role: 366,
            title: 'Main',
            url: '/menu/main',
            icon: 'home'
        },

        {
            role: 366,
            title: 'Cobranzas',
            children: [
                {
                    title: 'Cobranzas',
                    url: '/menu/general-cobranza-list',
                    icon: 'cash-outline'
                },
                {
                    title: 'Verificar Pago',
                    url: '/menu/verificar-pago',
                    icon: 'checkmark-outline'

                },
                {
                    title: 'Aprobar Cobranza',
                    url: '/menu/aprobar-cobranza',
                    icon: 'checkmark-done-outline'

                }
            ]
        },

    ]*/
    role: number;
    usuario: IUsuario;
    pageData: any;

    pages: PageMenu[] = [];
    pageMenu: PageMenu[] = [];

    constructor(public ge: GeneralService, public http: HttpClient) { }

    async ngOnInit() {


        //await this.ReadMenuFromJsonToAssetFolder();

        //this.pages = this.pageData;
        this.pageMenu = JSON.parse(localStorage.getItem("menu"));
        console.log("pageMenu", this.pageMenu);
        this.pages = this.pageMenu;
        console.log("pages antes de filtrar", this.pages);
        //this.role = +localStorage.getItem('Role');
        //console.log("role", this.role);
        //this.pages = this.pages.filter(x => x.role == this.role);
        console.log("pages despues de filtrar", this.pages);

    }

    async ReadMenuFromJsonToAssetFolder() {

        this.http.get("../../../assets/json/pages.json").subscribe((data) => {
            this.pages = <any>data;
            console.log("********************Page data", this.pageData);
        });

    }

}
