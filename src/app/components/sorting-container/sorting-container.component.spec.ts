import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingContainerComponent } from './sorting-container.component';

describe('SortingContainerComponent', () => {
  let component: SortingContainerComponent;
  let fixture: ComponentFixture<SortingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortingContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
