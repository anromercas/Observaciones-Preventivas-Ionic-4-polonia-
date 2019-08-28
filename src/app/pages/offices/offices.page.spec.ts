import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesPage } from './offices.page';

describe('OfficesPage', () => {
  let component: OfficesPage;
  let fixture: ComponentFixture<OfficesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
