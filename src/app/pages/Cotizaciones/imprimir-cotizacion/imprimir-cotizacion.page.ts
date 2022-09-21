import { Component, OnInit } from '@angular/core';
import { AppGeneralQuotesGetDto } from '../../../models/app-general-quotes-get-dto';
import { Router } from '@angular/router';
import { GeneralService } from '../../../services/general.service';
import { CotizacionesListService } from '../../../services/cotizaciones/cotizaciones-list.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-imprimir-cotizacion',
  templateUrl: './imprimir-cotizacion.page.html',
  styleUrls: ['./imprimir-cotizacion.page.scss'],
})
export class ImprimirCotizacionPage implements OnInit {
  public cotizacion: AppGeneralQuotesGetDto
  basePath: string;
  accionPath: string;
  controller: string;
  titulo: string;
  link: string;
  form: FormGroup;
  constructor(private router: Router,
    private generalService: GeneralService,
    private cotizacionesListService: CotizacionesListService,
    private formBuilder: FormBuilder) {
      this.basePath = generalService.basePath;
      this.controller = 'AppReport/';
      this.accionPath = "GetCotizacion";

  }

  ngOnInit() {
    this.buildForm();
    //subscripcion al observable de cotizaciones



    this.cotizacionesListService.cotizacion$.subscribe(resp => {
      this.cotizacion = resp
      this.titulo = "Imprimir Cotizacion "
      /* console.log('Cotizacion en imprimir', this.cotizacion);

      let subcategory: number = 0;
      if (this.cotizacion.appDetailQuotesGetDto) {
        subcategory = this.cotizacion.appDetailQuotesGetDto[0].appProductsGetDto.appSubCategoryId;
      } else {
        subcategory = 1;
      } */
      //this.link = 'https://mooreapps.com.ve/AppServiceBack/api/AppReport/GetCotizacion/' + this.cotizacion.cotizacion + '/true/true/true/true/true' + '/' + subcategory;

    })

  }
  buildForm() {

    this.form = this.formBuilder.group({

      flagTotal: [true, [Validators.required]],
      flagFormasCaja: [true, [Validators.required]],
      flagIva: [true, [Validators.required]],
      observaciones: [true, [Validators.required]],
      imprimirUsd: [true, [Validators.required]],
    })


  }


  imprimirUsdChanged(event) {
    this.form.get('imprimirUsd').setValue(event);
    if (event) {
      this.form.get('flagIva').setValue(false);
    }
    this.armaLink();
  }

  imprimirIvaChanged(event) {
    this.form.get('flagIva').setValue(event);
    this.armaLink();
  }
  openLink() {

    console.log('al entrar en openLink')
    console.log('this.basePath',this.basePath);
    console.log('this.controller',this.controller);
    console.log('this.accionPath',this.accionPath);
    let baseLink= this.basePath + this.controller + this.accionPath;
    console.log('baseLink',baseLink);
   

    if (this.form.get('imprimirUsd')) {
      this.form.get('flagIva').setValue(false);
    }
    //this.link = 'https://mooreapps.com.ve/AppServiceBack/api/AppReport/GetCotizacion/' +
    this.link =baseLink + '/' +
      this.cotizacion.cotizacion + '/' + this.form.get('flagIva').value + '/' + this.form.get('flagIva').value + '/' + this.form.get('flagIva').value + '/' + this.form.get('observaciones').value + '/' + this.form.get('imprimirUsd').value + '/' + this.cotizacion.appDetailQuotesGetDto[0].appProductsGetDto.appSubCategoryId;
      console.log('Ling  de imprimir cotizacion',this.link)
    // window.open(this.link, '_blank');
    window.open(this.link, "_parent", "download");
  }

  openLinkWord() {
    if (this.form.get('imprimirUsd')) {
      this.form.get('flagIva').setValue(false);
    }

    this.link = 'https://mooreapps.com.ve/AppServiceBack/api/AppReport/GetCotizacionWord/' +
      this.cotizacion.cotizacion + '/' + this.form.get('flagIva').value + '/' + this.form.get('flagIva').value + '/' + this.form.get('flagIva').value + '/' + this.form.get('observaciones').value + '/' + this.form.get('imprimirUsd').value + '/' + this.cotizacion.appDetailQuotesGetDto[0].appProductsGetDto.appSubCategoryId;

    // window.open(this.link, '_blank');
    window.open(this.link, "_parent", "download");
  }

  openLinkExcel() {
    if (this.form.get('imprimirUsd')) {
      this.form.get('flagIva').setValue(false);
    }

    this.link = 'https://mooreapps.com.ve/AppServiceBack/api/AppReport/GetCotizacionExcel/' +
      this.cotizacion.cotizacion + '/' + this.form.get('flagIva').value + '/' + this.form.get('flagIva').value + '/' + this.form.get('flagIva').value + '/' + this.form.get('observaciones').value + '/' + this.form.get('imprimirUsd').value + '/' + this.cotizacion.appDetailQuotesGetDto[0].appProductsGetDto.appSubCategoryId;

    // window.open(this.link, '_blank');
    window.open(this.link, "_parent", "download");
  }


  armaLink() {

    let subcategory: number = 0;
    if (this.cotizacion.appDetailQuotesGetDto) {
      subcategory = this.cotizacion.appDetailQuotesGetDto[0].appProductsGetDto.appSubCategoryId;
    } else {
      subcategory = 1;
    }

    this.link = 'https://mooreapps.com.ve/AppServiceBack/api/AppReport/GetCotizacion/' +
      this.cotizacion.cotizacion + '/' + this.form.get('flagIva').value + '/' + this.form.get('flagIva').value + '/' + this.form.get('flagIva').value + '/' + this.form.get('observaciones').value + '/' + this.form.get('imprimirUsd').value + '/' + subcategory;
    console.log(this.link)
  }
}