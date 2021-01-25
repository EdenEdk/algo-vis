import { Component } from '@angular/core';
import { INTERVALS } from 'src/app/model/consts/intervals';
import { SORT_TYPES } from 'src/app/model/consts/sort-types';
import { SortingAlgoService } from 'src/app/services/sorting-algo/sorting-algo.service';

@Component({
  selector: 'app-sorting-container',
  templateUrl: './sorting-container.component.html',
  styleUrls: ['./sorting-container.component.scss']
})
export class SortingContainerComponent{
  numbersArray:number []= [];
  sortStarted:boolean=false;
  sortType = SORT_TYPES.SELECTION;
  intervalTime = INTERVALS.AVERAGE;
  intervalCombobox:{type:string, ms:number}[]=[];
  sortTypeCombobox:{name:string, value:string}[]=[];


  constructor(private readonly sortingAlgo:SortingAlgoService) { 
    this.numbersArray = this.sortingAlgo.generateRandomArray(40, [50, 360]);
    this.intervalCombobox = Object.entries(INTERVALS).map(([type,ms])=>{
      return {type,ms};
    });
    this.sortTypeCombobox = Object.entries(SORT_TYPES).map(([name,value])=>{
      return {name,value};
    });
  }

  startSorting(): void {
    this.sortingAlgo.startSorting(this.sortType, this.numbersArray);
  }

  stopSorting():void{
    this.sortingAlgo.stopSorting();
  }

  changeSortSpeed(selectedSpeed:string):void{
    this.sortingAlgo.setSleepTime(+selectedSpeed);
  }

  generateNewArray(){
    this.numbersArray = this.sortingAlgo.generateRandomArray(40, [50, 360]);
}
}
