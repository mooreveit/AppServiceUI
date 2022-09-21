import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuscadorCompetidorPage } from './buscador-competidor.page';

describe('BuscadorCompetidorPage', () => {
  let component: BuscadorCompetidorPage;
  let fixture: ComponentFixture<BuscadorCompetidorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorCompetidorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorCompetidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
