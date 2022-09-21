import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactosListPage } from './contactos-list.page';

describe('ContactosListPage', () => {
  let component: ContactosListPage;
  let fixture: ComponentFixture<ContactosListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactosListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
