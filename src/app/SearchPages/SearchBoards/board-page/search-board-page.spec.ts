import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoardPageComponent } from './search-board-page.component';

describe('BoardPageComponent', () => {
  let component: SearchBoardPageComponent;
  let fixture: ComponentFixture<SearchBoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBoardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
