import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputParent } from './input-parent';

describe('InputParent', () => {
  let component: InputParent;
  let fixture: ComponentFixture<InputParent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputParent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputParent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
