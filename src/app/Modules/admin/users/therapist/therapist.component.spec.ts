import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistComponent } from './therapist.component';

describe('TherapistComponent', () => {
  let component: TherapistComponent;
  let fixture: ComponentFixture<TherapistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TherapistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
