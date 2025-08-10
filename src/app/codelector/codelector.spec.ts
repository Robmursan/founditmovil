import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Codelector } from './codelector';

describe('Codelector', () => {
  let component: Codelector;
  let fixture: ComponentFixture<Codelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Codelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Codelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
