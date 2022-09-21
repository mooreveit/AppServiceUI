import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductosListPage } from './productos-list.page';

describe('ProductosListPage', () => {
  let component: ProductosListPage;
  let fixture: ComponentFixture<ProductosListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
