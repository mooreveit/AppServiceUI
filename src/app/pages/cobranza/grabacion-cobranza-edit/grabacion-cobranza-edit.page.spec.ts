import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrabacionCobranzaEditPage } from './grabacion-cobranza-edit.page';

describe('GrabacionCobranzaEditPage', () => {
  let component: GrabacionCobranzaEditPage;
  let fixture: ComponentFixture<GrabacionCobranzaEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrabacionCobranzaEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrabacionCobranzaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
