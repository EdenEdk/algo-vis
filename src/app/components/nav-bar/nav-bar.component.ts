import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  selectedTab:number=0;

  tabClicked(tabIndex:number):void{
    this.selectedTab=tabIndex;
  }
}
