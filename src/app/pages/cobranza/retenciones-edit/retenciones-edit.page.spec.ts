import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RetencionesEditPage } from './retenciones-edit.page';

describe('RetencionesEditPage', () => {
  let component: RetencionesEditPage;
  let fixture: ComponentFixture<RetencionesEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetencionesEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RetencionesEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
