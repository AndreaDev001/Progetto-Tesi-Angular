import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionOptionsComponent } from './discussion-options.component';

describe('DiscussionOptionsComponent', () => {
  let component: DiscussionOptionsComponent;
  let fixture: ComponentFixture<DiscussionOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscussionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
