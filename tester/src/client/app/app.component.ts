import { Component, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked { 

  @ViewChild('navMenu') ul: ElementRef; 

  navMenus: HTMLBaseElement[] = [];

  // app.component.ts
  inkbarSubject: Subject<HTMLBaseElement> = new Subject();

  // Specify inkbar color here. Could be any css-compatible color,
  // i.e. indigo, #eeeeee, rgba(70, 70, 200, 0.8), etc.
  inkbarColor = "purple"; 

  /*
  * The function used to move your inkbar under the element 
  * based on your mouse click, or specified otherwise.
  */
  inkbarMove = (ele: HTMLBaseElement | MouseEvent) => {
    if (ele instanceof MouseEvent) {
      ele = ele.target as HTMLBaseElement;
    }
    this.inkbarSubject.next(ele);
  };

  getAvtiveMenu = () => {
    for (let menu of this.navMenus) {
      if (menu.classList.contains('active')) {
        return menu;
      }
    }
    return null;
  };

  constructor(

  ) {
  }

  ngAfterViewChecked() {
    this.navMenus = this.ul.nativeElement.children;

    let actMenu = this.getAvtiveMenu();

    if (actMenu) {

      this.inkbarMove(actMenu);
    }
  }

}