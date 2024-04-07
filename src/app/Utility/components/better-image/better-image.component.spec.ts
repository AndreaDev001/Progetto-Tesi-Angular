import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetterImageComponent } from './better-image.component';

describe('BetterImageComponent', () => {
  let component: BetterImageComponent;
  let fixture: ComponentFixture<BetterImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetterImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetterImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
