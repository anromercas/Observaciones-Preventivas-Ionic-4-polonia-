import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormPage } from './view-form.page';

describe('ViewFormPage', () => {
  let component: ViewFormPage;
  let fixture: ComponentFixture<ViewFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
