import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { AppProdutsQueryFilter } from 'src/app/interfaces/app-produts-query-filter';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { AppProductsGetDto } from 'src/app/models/app-products-get-dto';
import { GeneralService } from 'src/app/services/general.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-search-existencia',
  templateUrl: './search-existencia.page.html',
  styleUrls: ['./search-existencia.page.scss'],
})
export class SearchExistenciaPage implements OnInit {

  appProdutsQueryFilter: AppProdutsQueryFilter;
  appProductsGetDto: AppProductsGetDto[] = [];
  appProductsGetDtoNew: AppProductsGetDto[] = [];


  usuario: IUsuario;
  tituloVentaEdicion: string;
  public showLoading: boolean = false;

  constructor(private productoService: ProductoService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public generalService: GeneralService,
    public toastController: ToastController,
    private router: Router,
    private modalCtrl: ModalController,
  ) {
    this.usuario = this.generalService.GetUsuario();

  }

  ngOnInit() {

    this.productoService.allProducts$.subscribe(allProducts => {
      this.appProductsGetDto = allProducts.data;
      console.log('productos al cargar busqueda', this.appProductsGetDto)

    });

    this.appProdutsQueryFilter = {
      pageSize: 20,
      pageNumber: 1,
      id: 0,
      code: '',
      description1: '',
      description2: '',
      searchText: ''

    }

    this.refresh();

  }

  onChangeSearchText(event) {

    this.appProdutsQueryFilter.searchText = event.target.value;
    this.refresh();

  }


  refresh() {
    this.showLoading = true;
    this.productoService.GetAllAppProducts(this.appProdutsQueryFilter);




    this.showLoading = false;
  }


  save(event) { }


}
