import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinePage } from './magazine.page';

describe('MagazinePage', () => {
  let component: MagazinePage;
  let fixture: ComponentFixture<MagazinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagazinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
