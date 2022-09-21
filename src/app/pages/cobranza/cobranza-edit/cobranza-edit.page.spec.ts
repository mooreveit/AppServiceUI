import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CobranzaEditPage } from './cobranza-edit.page';

describe('CobranzaEditPage', () => {
  let component: CobranzaEditPage;
  let fixture: ComponentFixture<CobranzaEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobranzaEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CobranzaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
