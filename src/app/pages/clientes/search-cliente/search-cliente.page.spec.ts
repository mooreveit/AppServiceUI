import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchClientePage } from './search-cliente.page';

describe('SearchClientePage', () => {
  let component: SearchClientePage;
  let fixture: ComponentFixture<SearchClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
