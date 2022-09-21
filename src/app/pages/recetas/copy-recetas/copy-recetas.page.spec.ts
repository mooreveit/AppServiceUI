import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CopyRecetasPage } from './copy-recetas.page';

describe('CopyRecetasPage', () => {
  let component: CopyRecetasPage;
  let fixture: ComponentFixture<CopyRecetasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyRecetasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CopyRecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
