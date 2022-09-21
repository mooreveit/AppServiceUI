import { Component, OnInit } from '@angular/core';
import { AppIngredientsGetDto } from '../../models/app-ingredients-get-dto';
import { AppIngredientsQueryFilter } from '../../interfaces/app-ingredients-query-filter';
import { Router } from '@angular/router';
import { IngredientesService } from '../../services/ingredientes.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-buscador-ingredientes',
  templateUrl: './buscador-ingredientes.component.html',
  styleUrls: ['./buscador-ingredientes.component.scss'],
})
export class BuscadorIngredientesComponent implements OnInit {


  itemAppIngredientsGetDto: AppIngredientsGetDto;


  appIngredientsQueryFilter: AppIngredientsQueryFilter;
  appIngredientsGetDto: AppIngredientsGetDto[] = [];

  constructor(private modalCtrl: ModalController, private router: Router,
    private ingredientesService: IngredientesService,) { }

  ngOnInit() {


    this.ingredientesService.allIngredients$.subscribe(resp => {
      this.appIngredientsGetDto = resp.data;
      console.log(resp.data);
    });

    this.appIngredientsQueryFilter = {
      id: 0,
      pageSize: 100,
      pageNumber: 1,
      code: '',
      description: '',
      searchText: ''
    }
    this.ingredientesService.GetAllAppIngredients(this.appIngredientsQueryFilter);

  }


  refresh() {
    this.ingredientesService.GetAllAppIngredients(this.appIngredientsQueryFilter);
  }

  onChangeSearchText(event) {

    this.appIngredientsQueryFilter.searchText = event.target.value;
    this.refresh();
  }

  selectIngrediente(item: AppIngredientsGetDto) {

    this.modalCtrl.dismiss({
      id: item.id,
      description: item.description
    });

  }

  closeModal() {
    this.modalCtrl.dismiss()
  }

}
