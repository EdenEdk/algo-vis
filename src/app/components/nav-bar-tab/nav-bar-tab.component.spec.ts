import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarTabComponent } from './nav-bar-tab.component';

describe('NavBarTabComponent', () => {
  let component: NavBarTabComponent;
  let fixture: ComponentFixture<NavBarTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
