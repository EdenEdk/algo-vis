import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {
  @Input() title:string;
  @Input() icon:string;
  @Output() btnClick:EventEmitter<void>;
  constructor() { 
    this.btnClick = new EventEmitter();
  }

  ngOnInit(): void {
  }

  click():void{
    this.btnClick.emit();
  }
}
