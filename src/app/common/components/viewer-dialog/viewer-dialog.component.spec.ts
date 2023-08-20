import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerDialogComponent } from './viewer-dialog.component';

describe('ViewerDialogComponent', () => {
  let component: ViewerDialogComponent;
  let fixture: ComponentFixture<ViewerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
