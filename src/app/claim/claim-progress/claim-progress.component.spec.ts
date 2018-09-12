import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimProgressComponent } from './claim-progress.component';

describe('ClaimProgressComponent', () => {
  let component: ClaimProgressComponent;
  let fixture: ComponentFixture<ClaimProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
