import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchExistenciaPage } from './search-existencia.page';

describe('SearchExistenciaPage', () => {
  let component: SearchExistenciaPage;
  let fixture: ComponentFixture<SearchExistenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchExistenciaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchExistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
