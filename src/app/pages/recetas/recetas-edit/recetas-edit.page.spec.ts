import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecetasEditPage } from './recetas-edit.page';

describe('RecetasEditPage', () => {
  let component: RecetasEditPage;
  let fixture: ComponentFixture<RecetasEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetasEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecetasEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
