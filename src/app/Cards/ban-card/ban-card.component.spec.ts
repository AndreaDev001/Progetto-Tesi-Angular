import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanCardComponent } from './ban-card.component';

describe('BanCardComponent', () => {
  let component: BanCardComponent;
  let fixture: ComponentFixture<BanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
