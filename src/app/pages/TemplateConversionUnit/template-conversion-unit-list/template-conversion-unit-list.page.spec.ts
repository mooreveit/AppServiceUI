import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TemplateConversionUnitListPage } from './template-conversion-unit-list.page';

describe('TemplateConversionUnitListPage', () => {
  let component: TemplateConversionUnitListPage;
  let fixture: ComponentFixture<TemplateConversionUnitListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateConversionUnitListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateConversionUnitListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
