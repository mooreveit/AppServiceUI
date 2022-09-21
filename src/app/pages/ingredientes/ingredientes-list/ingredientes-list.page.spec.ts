import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngredientesListPage } from './ingredientes-list.page';

describe('IngredientesListPage', () => {
  let component: IngredientesListPage;
  let fixture: ComponentFixture<IngredientesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientesListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
