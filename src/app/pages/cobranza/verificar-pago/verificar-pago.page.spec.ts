import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerificarPagoPage } from './verificar-pago.page';

describe('VerificarPagoPage', () => {
  let component: VerificarPagoPage;
  let fixture: ComponentFixture<VerificarPagoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarPagoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificarPagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
