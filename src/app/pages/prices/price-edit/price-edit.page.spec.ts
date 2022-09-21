import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PriceEditPage } from './price-edit.page';

describe('PriceEditPage', () => {
  let component: PriceEditPage;
  let fixture: ComponentFixture<PriceEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PriceEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
