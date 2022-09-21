import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DireccionListPage } from './direccion-list.page';

describe('DireccionListPage', () => {
  let component: DireccionListPage;
  let fixture: ComponentFixture<DireccionListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DireccionListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DireccionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
