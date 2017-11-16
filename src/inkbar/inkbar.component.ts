import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
//import 'rxjs/add/operator/debounceTime';

@Component({
	selector: 'lib-inkbar',
	templateUrl: './inkbar.component.html',
	styleUrls: ['./inkbar.component.scss']
})
export class InkbarComponent implements OnInit, OnDestroy {

	@Input() color: any;
	@Input() nextEle: Subject<HTMLBaseElement>;

  inkbarStyle = {
    width: "0px",
    left: "0px",
    backgroundColor: "white"
  }

	constructor() { }

  // ink bar
  _getLeftPosition = (ele: HTMLBaseElement) => {
    return ele ? ele.offsetLeft + 'px' : '0';
  };

  _getElementWidth = (ele: HTMLBaseElement) => {
    return ele ? ele.offsetWidth + 'px' : '0';
  };

  inkbarInPos = (ele: HTMLBaseElement) => {
    this.inkbarStyle.width = this._getElementWidth(ele);
		this.inkbarStyle.left = this._getLeftPosition(ele);
  }
	
	ngOnInit() {
		this.inkbarStyle.backgroundColor = this.color;
		this.nextEle

		.subscribe(
			(next) => {
				this.inkbarInPos(next);
			}
		)
	}

	ngOnDestroy() {
		this.nextEle.unsubscribe();
	}

}
