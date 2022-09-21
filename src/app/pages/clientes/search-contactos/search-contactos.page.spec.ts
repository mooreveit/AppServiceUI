import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchContactosPage } from './search-contactos.page';

describe('SearchContactosPage', () => {
  let component: SearchContactosPage;
  let fixture: ComponentFixture<SearchContactosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchContactosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchContactosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
