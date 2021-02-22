import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmidadeSoloComponent } from './umidade-solo.component';

describe('UmidadeSoloComponent', () => {
  let component: UmidadeSoloComponent;
  let fixture: ComponentFixture<UmidadeSoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmidadeSoloComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmidadeSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
