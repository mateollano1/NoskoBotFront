import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotControllerComponent } from './bot-controller.component';

describe('BotControllerComponent', () => {
  let component: BotControllerComponent;
  let fixture: ComponentFixture<BotControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
