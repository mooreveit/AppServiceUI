import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TemplateConversionUnitEditPage } from './template-conversion-unit-edit.page';

describe('TemplateConversionUnitEditPage', () => {
  let component: TemplateConversionUnitEditPage;
  let fixture: ComponentFixture<TemplateConversionUnitEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateConversionUnitEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateConversionUnitEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
