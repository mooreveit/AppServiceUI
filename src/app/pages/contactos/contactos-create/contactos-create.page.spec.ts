import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactosCreatePage } from './contactos-create.page';

describe('ContactosCreatePage', () => {
  let component: ContactosCreatePage;
  let fixture: ComponentFixture<ContactosCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactosCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactosCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
