import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPollsPageComponent } from './search-polls-page.component';

describe('SearchPollsComponent', () => {
  let component: SearchPollsPageComponent;
  let fixture: ComponentFixture<SearchPollsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPollsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPollsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
