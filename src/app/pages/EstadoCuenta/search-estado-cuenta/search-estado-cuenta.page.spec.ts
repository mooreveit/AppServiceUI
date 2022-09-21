import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchEstadoCuentaPage } from './search-estado-cuenta.page';

describe('SearchEstadoCuentaPage', () => {
  let component: SearchEstadoCuentaPage;
  let fixture: ComponentFixture<SearchEstadoCuentaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEstadoCuentaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchEstadoCuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
