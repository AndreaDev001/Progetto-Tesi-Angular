import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPollsComponent } from './search-polls.component';

describe('SearchPollsComponent', () => {
  let component: SearchPollsComponent;
  let fixture: ComponentFixture<SearchPollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPollsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
