import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionsPageComponent } from './discussions-page.component';

describe('DiscussionsPageComponent', () => {
  let component: DiscussionsPageComponent;
  let fixture: ComponentFixture<DiscussionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscussionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
