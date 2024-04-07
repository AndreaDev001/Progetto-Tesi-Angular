import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsersPageComponent } from './search-users-page.component';

describe('UsersPageComponent', () => {
  let component: SearchUsersPageComponent;
  let fixture: ComponentFixture<SearchUsersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchUsersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
