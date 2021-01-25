import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortVisualizationComponent } from './sort-visualization.component';

describe('SortVisualizationComponent', () => {
  let component: SortVisualizationComponent;
  let fixture: ComponentFixture<SortVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortVisualizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
