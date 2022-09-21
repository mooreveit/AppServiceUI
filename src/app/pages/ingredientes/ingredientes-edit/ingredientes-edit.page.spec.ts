import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngredientesEditPage } from './ingredientes-edit.page';

describe('IngredientesEditPage', () => {
  let component: IngredientesEditPage;
  let fixture: ComponentFixture<IngredientesEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientesEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientesEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
