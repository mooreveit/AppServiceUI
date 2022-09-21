import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactosEditPage } from './contactos-edit.page';

describe('ContactosEditPage', () => {
  let component: ContactosEditPage;
  let fixture: ComponentFixture<ContactosEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactosEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactosEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
