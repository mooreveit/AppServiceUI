import { Component, OnInit } from '@angular/core';
import { AppVariablesQueryFilter } from '../../interfaces/app-variables-query-filter';
import { AppVariablesGetDto } from '../../models/app-variables-get-dto';
import { CalculoVariablesService } from '../../services/calculo-variables.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-buscador-variables',
  templateUrl: './buscador-variables.component.html',
  styleUrls: ['./buscador-variables.component.scss'],
})
export class BuscadorVariablesComponent implements OnInit {


  private appVariablesQueryFilter = new AppVariablesQueryFilter()

  public appVariablesGetDto: AppVariablesGetDto[] = [];


  constructor(private modalCtrl: ModalController, private calculoVariablesService: CalculoVariablesService) { } readonly
  ngOnInit() {


    this.calculoVariablesService.allVariables$.subscribe(allVariables => {
      this.appVariablesGetDto = allVariables.data;
      console.log("en el int del buscador de variables", allVariables.data);
      console.log("en el int del buscador de variables", this.appVariablesGetDto);
    });

    this.appVariablesQueryFilter = {
      pageSize: 10,
      pageNumber: 1,
      code: '',
      description: '',
      searchText: ''
    }

    this.calculoVariablesService.GetAllAppVariable(this.appVariablesQueryFilter);


  }

  refreshVariables() {
    this.calculoVariablesService.GetAllAppVariable(this.appVariablesQueryFilter);
  }

  onChangeSearchTextVariables(event) {

    this.appVariablesQueryFilter.searchText = event.target.value;
    this.refreshVariables();
  }

  selectVariable(item: AppVariablesGetDto) {

    this.modalCtrl.dismiss({
      id: item.id,
      code: item.code
    });

  }

  closeModal() {
    this.modalCtrl.dismiss()
  }


}
