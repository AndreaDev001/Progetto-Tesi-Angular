import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBanPageComponent } from './search-ban-page.component';

describe('BanPageComponent', () => {
  let component: SearchBanPageComponent
  let fixture: ComponentFixture<SearchBanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBanPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
