/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import { InputComponent } from './input.component';

@Component({selector: 'app-params', template: ''})
class InputParamsStubComponent {}

@Component({selector: 'app-options', template: ''})
class InputOptionsStubComponent {}

@Component({selector: 'app-controlls', template: ''})
class InputControllsStubComponent {}

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputComponent,
        InputParamsStubComponent,
        InputOptionsStubComponent,
        InputControllsStubComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    //expect(component).toBeTruthy();
  });
  */
});
