import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDiscussionsComponent } from './search-discussions.component';

describe('SearchDiscussionsComponent', () => {
  let component: SearchDiscussionsComponent;
  let fixture: ComponentFixture<SearchDiscussionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDiscussionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDiscussionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
