import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmidadeArComponent } from './umidade-ar.component';

describe('UmidadeArComponent', () => {
  let component: UmidadeArComponent;
  let fixture: ComponentFixture<UmidadeArComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmidadeArComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmidadeArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
