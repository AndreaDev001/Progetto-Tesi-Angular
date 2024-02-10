import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikePagesComponent } from './like-pages.component';

describe('LikePagesComponent', () => {
  let component: LikePagesComponent;
  let fixture: ComponentFixture<LikePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikePagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
