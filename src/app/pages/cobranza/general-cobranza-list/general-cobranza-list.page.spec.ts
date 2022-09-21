import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneralCobranzaListPage } from './general-cobranza-list.page';

describe('GeneralCobranzaListPage', () => {
  let component: GeneralCobranzaListPage;
  let fixture: ComponentFixture<GeneralCobranzaListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralCobranzaListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralCobranzaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
