import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RetencionesListPage } from './retenciones-list.page';

describe('RetencionesListPage', () => {
  let component: RetencionesListPage;
  let fixture: ComponentFixture<RetencionesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetencionesListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RetencionesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
