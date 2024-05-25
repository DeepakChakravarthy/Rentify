import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestModalComponent } from './interest-modal.component';

describe('InterestModalComponent', () => {
  let component: InterestModalComponent;
  let fixture: ComponentFixture<InterestModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterestModalComponent]
    });
    fixture = TestBed.createComponent(InterestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
