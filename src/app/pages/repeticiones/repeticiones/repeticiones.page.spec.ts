import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepeticionesPage } from './repeticiones.page';

describe('RepeticionesPage', () => {
  let component: RepeticionesPage;
  let fixture: ComponentFixture<RepeticionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeticionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepeticionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
