import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReportsPageComponent } from './search-reports-page.component';

describe('ReportPageComponent', () => {
  let component: SearchReportsPageComponent;
  let fixture: ComponentFixture<SearchReportsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchReportsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchReportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
