import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AprobarCobranzaPage } from './aprobar-cobranza.page';

describe('AprobarCobranzaPage', () => {
  let component: AprobarCobranzaPage;
  let fixture: ComponentFixture<AprobarCobranzaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobarCobranzaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AprobarCobranzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
