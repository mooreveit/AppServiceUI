import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrabacionCobranzaListPage } from './grabacion-cobranza-list.page';

describe('GrabacionCobranzaListPage', () => {
  let component: GrabacionCobranzaListPage;
  let fixture: ComponentFixture<GrabacionCobranzaListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrabacionCobranzaListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrabacionCobranzaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
