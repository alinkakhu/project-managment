import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColumnBtnComponent } from './add-column-btn.component';

describe('AddColumnBtnComponent', () => {
  let component: AddColumnBtnComponent;
  let fixture: ComponentFixture<AddColumnBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddColumnBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddColumnBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
