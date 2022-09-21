import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CotizacionesListPage } from './cotizaciones-list.page';

describe('CotizacionesListPage', () => {
  let component: CotizacionesListPage;
  let fixture: ComponentFixture<CotizacionesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionesListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CotizacionesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
