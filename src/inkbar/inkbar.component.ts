import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';

import * as config from './inkbar.component.config';

@Component({
	selector: 'lib-inkbar',
	// templateUrl: './inkbar.component.html',
	template: `
	
		<main>
			<div class="inkbar" [ngStyle]="inkbarStyle"></div>
		</main>	
	
	`,
	// styleUrls: ['./inkbar.component.scss']
  styles: [`
		div.inkbar {
			position: absolute;
			bottom: 0;
			height: 2px;
			transition: .5s cubic-bezier(.35,0,.25,1);
			z-index: 10;
		}
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
