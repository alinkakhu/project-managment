import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoardBtnComponent } from './create-board-btn.component';

describe('CreateBoardBtnComponent', () => {
  let component: CreateBoardBtnComponent;
  let fixture: ComponentFixture<CreateBoardBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBoardBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBoardBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
