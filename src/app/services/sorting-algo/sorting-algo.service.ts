import { Injectable, EventEmitter } from '@angular/core';
import { INTERVALS } from 'src/app/model/consts/intervals';
import { SORT_TYPES } from 'src/app/model/consts/sort-types';
import { SortStep, DEFAULT_IDXS } from 'src/app/model/interfaces/sort-step';

@Injectable({
  providedIn: 'root'
})
export class SortingAlgoService {

  private ongoingSort:boolean = false;
  private sortStepEmitter:EventEmitter<SortStep>;
  private sleepTime:number = INTERVALS.AVERAGE;

  constructor() { 
    this.sortStepEmitter = new EventEmitter();
  }
  
  registerToStepCallback(callbackFunc:(sortStep:SortStep)=>void){
    this.sortStepEmitter.subscribe(callbackFunc);
  }

  setSleepTime(newSleepTime:number):void{
    this.sleepTime = newSleepTime;
  }

  startSorting(sortType:string, numbersArray:number[]):void{
    let selectedSort;
    if(!this.ongoingSort){
      this.ongoingSort = true;
      switch(sortType){
        case SORT_TYPES.SELECTION:
          selectedSort = this.selectionSort.bind(this);
          break;
        case SORT_TYPES.INSERTION:
          selectedSort = this.insertionSort.bind(this);
          break;
        case SORT_TYPES.BUBBLE:
           selectedSort = this.bubbleSort.bind(this);
           break;
        case SORT_TYPES.QUICK:
          selectedSort = this.quickSortWrapper.bind(this);
          break;
      }
      const arrayLength:number = numbersArray.length;
      selectedSort(numbersArray, arrayLength).then(()=>{
        this.stopSorting();    
      });
    }
  }

  stopSorting(): void{
    this.ongoingSort = false;
    setTimeout(()=>{
      this.sortStepEmitter.emit(DEFAULT_IDXS);
    },500);
  }

  generateRandomArray(arrLength:number,range:number[]=[] ,includeNegatives:boolean=false):number[]{
    let generatedArray:number[] = [];
    generatedArray = Array.from({length: arrLength}, () => {
      let randomNumber:number = 0;
      if(range.length === 2){
        randomNumber = this.getRandomIntInclusive(range[0], range[1]);
      }
      else if(includeNegatives){
        randomNumber = this.getRandomIntInclusive(-arrLength, arrLength);
      }
      else{
        randomNumber = this.getRandomIntInclusive(0, arrLength);
      }
      return randomNumber;
    });
    return generatedArray;
  }

  private async selectionSort(numbersArray:number[], arrayLength:number):Promise<boolean> {
    for( let idx1=0 ; idx1< arrayLength-1; idx1++){
      let idx2Min = idx1;
      for (let idx2 = idx1+1; idx2 < arrayLength; idx2++){
        if (numbersArray[idx2] < numbersArray[idx2Min]){
          idx2Min = idx2;
        }
        const stopSorting:boolean = await this.handleSortStep({idx1, idx2, replaceIdx:idx2Min});
        if(stopSorting){
          return false;
        }
      }
      if (idx2Min != idx1){
        this.swapArrayElements(numbersArray,idx1,idx2Min);
      }
    }
    return true;
  }

  private async insertionSort(numbersArray:number[], arrayLength:number):Promise<boolean>{
    for (let idxToMove = 1; idxToMove < arrayLength; ++idxToMove) { 
      const numberToMove:number = numbersArray[idxToMove]; 
      let idx2:number = idxToMove - 1; 

      while (idx2 >= 0 && numbersArray[idx2] > numberToMove) { 
        const stopSorting:boolean = await this.handleSortStep({
          idx1: idx2,
          idx2: -1, 
          replaceIdx: idx2-1
        });
        if(stopSorting){
          return false;
        }
        this.swapArrayElements(numbersArray,idx2 + 1,idx2);
        idx2 = idx2 - 1; 
      } 
      const stopSorting:boolean = await this.handleSortStep({
        idx1: idx2 + 1,
        idx2:idxToMove, 
        replaceIdx: -1
      });
      if(stopSorting){
        return false;
      }
      numbersArray[idx2 + 1] = numberToMove; 
    }
    return true;
  }

  private async bubbleSort(numbersArray:number[], arrayLength:number):Promise<boolean> {
    let continueSorting:boolean;
    let changedArrayLength:number=arrayLength;
    do{
      continueSorting = false;
      for(let idx1=1; idx1<=changedArrayLength; idx1++){
        const idx2:number = idx1-1;
        const shouldSwap = numbersArray[idx2] > numbersArray[idx1];
        const stopSorting:boolean = await this.handleSortStep({
            idx1, 
            idx2: shouldSwap ? -1 : idx2, 
            replaceIdx: shouldSwap ? idx2 : -1
          });
        if(stopSorting){
          return false;
        }
        if(shouldSwap){
          this.swapArrayElements(numbersArray,idx1,idx2);
          continueSorting = true;
        }
      }
      changedArrayLength-=1;
    }while(continueSorting);
    return true;
  }

  private async quickSortWrapper(numbersArray:number[], arrayLength:number):Promise<boolean>{
    const finished:boolean = await this.quickSort(numbersArray, 0, arrayLength-1);
    return finished;
  }

  private async quickSort(numbersArray:number[], low:number, high:number):Promise<boolean> {
    if (low < high)  {  
        const partitionIndex:number = await this.partition(numbersArray, low, high);  
        if(partitionIndex === -1){
          return false;
        }
        await this.quickSort(numbersArray, low, partitionIndex - 1);  
        await this.quickSort(numbersArray, partitionIndex + 1, high);  
    }
    else{
      return true;
    }
  }

  private async partition(numbersArray:number[], low:number, high:number):Promise<number>{
    const pivotNumber:number = numbersArray[high];
    let smallerElementIdx:number = low - 1; 
    for (let idx2 = low; idx2 <= high - 1; idx2++)  {  
      const smallerNumberFound:boolean = numbersArray[idx2] < pivotNumber;
      const stopSorting:boolean = await this.handleSortStep({
        pivotIdx:high,
        idx1: smallerNumberFound ? (smallerElementIdx+1) : -1, 
        idx2: smallerNumberFound ? -1 : idx2, 
        replaceIdx: smallerNumberFound ? idx2 : -1
      });
      if(stopSorting){
        return -1;
      }
      if (smallerNumberFound)  {  
           smallerElementIdx++;
           this.swapArrayElements(numbersArray,smallerElementIdx,idx2);
      }  
    }
    const lowIdxToReplace:number = smallerElementIdx + 1;
    const stopSorting:boolean = await this.handleSortStep({
      idx1:high, 
      replaceIdx:lowIdxToReplace
    });
    if(stopSorting){
      return -1;
    }
    this.swapArrayElements(numbersArray, high, lowIdxToReplace);
    return lowIdxToReplace; 
  }

  private async handleSortStep(sortStep:SortStep):Promise<boolean>{
    let stopSorting:boolean = false;
    if(!this.ongoingSort){
      stopSorting = true;
    }
    else{
      await this.sleep(this.sleepTime);
      this.sortStepEmitter.emit(sortStep); 
    }
    return stopSorting;
  }

  private sleep(ms:number):Promise<void> {
    return new Promise(res => setTimeout(res, ms))
  } 

  private swapArrayElements(numbersArray:number[], idx1:number, idx2:number):void{
    const tempIdx1 = numbersArray[idx1];
    numbersArray[idx1]=numbersArray[idx2];
    numbersArray[idx2] = tempIdx1;
  }

  private getRandomIntInclusive(min:number, max:number):number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
}
