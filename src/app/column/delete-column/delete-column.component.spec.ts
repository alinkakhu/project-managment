import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteColumnComponent } from './delete-column.component';

describe('DeleteColumnComponent', () => {
  let component: DeleteColumnComponent;
  let fixture: ComponentFixture<DeleteColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
