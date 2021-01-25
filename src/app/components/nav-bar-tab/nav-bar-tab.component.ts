import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-nav-bar-tab',
  templateUrl: './nav-bar-tab.component.html',
  styleUrls: ['./nav-bar-tab.component.scss']
})
export class NavBarTabComponent implements OnChanges {
  @Input() icon:string;
  @Input() title:string;
  @Input() tabPosition:number;
  @Input() selectedTab:number;
  @Output() tabClicked:EventEmitter<number>;

  constructor(){
    this.tabClicked = new EventEmitter();
  }

  selected:boolean = false;

  ngOnChanges(changes:SimpleChanges):void{
    if(changes.selectedTab){
      this.selected = this.tabPosition === this.selectedTab;
    }
  }

  clicked():void{
    this.tabClicked.emit(this.tabPosition);
  }
}
