import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDiscussionsPageComponent } from './search-discussions-page.component';

describe('SearchDiscussionsComponent', () => {
  let component: SearchDiscussionsPageComponent;
  let fixture: ComponentFixture<SearchDiscussionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDiscussionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDiscussionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
