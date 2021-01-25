import { Component, Input } from '@angular/core';
import { DEFAULT_IDXS, SortStep } from 'src/app/model/interfaces/sort-step';
import { SortingAlgoService } from 'src/app/services/sorting-algo/sorting-algo.service';

@Component({
  selector: 'app-sort-visualization',
  templateUrl: './sort-visualization.component.html',
  styleUrls: ['./sort-visualization.component.scss']
})
export class SortVisualizationComponent{
  @Input() sortedArray:number[] = [];
  sortStep:SortStep = DEFAULT_IDXS;

  constructor(private readonly sortingAlgo:SortingAlgoService) { 
    this.sortingAlgo.registerToStepCallback(this.idxStepChanged.bind(this));
  }

  idxStepChanged(sortStep:SortStep):void{
    this.sortStep = sortStep;
  }
}
