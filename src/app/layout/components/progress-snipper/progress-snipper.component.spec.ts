import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSnipperComponent } from './progress-snipper.component';

describe('ProgressSnipperComponent', () => {
  let component: ProgressSnipperComponent;
  let fixture: ComponentFixture<ProgressSnipperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressSnipperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressSnipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
