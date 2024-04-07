import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanFilterComponent } from './ban-filter.component';

describe('BanFilterComponent', () => {
  let component: BanFilterComponent;
  let fixture: ComponentFixture<BanFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
