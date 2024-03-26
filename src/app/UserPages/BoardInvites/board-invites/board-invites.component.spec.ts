import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardInvitesComponent } from './board-invites.component';

describe('BoardInvitesComponent', () => {
  let component: BoardInvitesComponent;
  let fixture: ComponentFixture<BoardInvitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardInvitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
