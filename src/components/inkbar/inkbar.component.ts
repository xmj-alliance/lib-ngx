import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
	selector: 'lib-inkbar',
	template: `
	
		[THIS_IS_MY_HTML!]
	
	`,
	styles: [`
	
		[THIS_IS_MY_STYLE!]
		
`]
})
export class InkbarComponent implements OnInit, OnDestroy {

	@Input() color: any;
	@Input() nextEle: Subject<HTMLBaseElement>;

	inkbarStyle: any;
	_getLeftPosition: (ele: HTMLBaseElement) => string;
	_getElementWidth: (ele: HTMLBaseElement) => string;
	inkbarInPos: (ele: HTMLBaseElement) => void;

	constructor() {
		this.inkbarStyle = {
			width: "0px",
			left: "0px",
			backgroundColor: "white"
		}
		this._getLeftPosition = (ele: HTMLBaseElement) => {
			return ele ? ele.offsetLeft + 'px' : '0';
		};
		this._getElementWidth = (ele: HTMLBaseElement) => {
			return ele ? ele.offsetWidth + 'px' : '0';
		};
		this.inkbarInPos = (ele: HTMLBaseElement) => {
			this.inkbarStyle.width = this._getElementWidth(ele);
			this.inkbarStyle.left = this._getLeftPosition(ele);
		}

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
