import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimSaveComponent } from './claim-save.component';

describe('ClaimSaveComponent', () => {
  let component: ClaimSaveComponent;
  let fixture: ComponentFixture<ClaimSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
