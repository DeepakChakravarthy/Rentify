import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenImageModalComponent } from './full-screen-image-modal.component';

describe('FullScreenImageModalComponent', () => {
  let component: FullScreenImageModalComponent;
  let fixture: ComponentFixture<FullScreenImageModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullScreenImageModalComponent]
    });
    fixture = TestBed.createComponent(FullScreenImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
