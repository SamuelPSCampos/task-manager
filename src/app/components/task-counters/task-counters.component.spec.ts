import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCountersComponent } from './task-counters.component';

describe('TaskCountersComponent', () => {
  let component: TaskCountersComponent;
  let fixture: ComponentFixture<TaskCountersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCountersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCountersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
