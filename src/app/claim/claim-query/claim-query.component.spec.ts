import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimQueryComponent } from './claim-query.component';

describe('ClaimQueryComponent', () => {
  let component: ClaimQueryComponent;
  let fixture: ComponentFixture<ClaimQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
