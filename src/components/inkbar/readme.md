# Inkbar
A 山寨 inkbar inspired by G⭕⛔g❗e material design.

## Features
- Automatically adjust itself based on element position width.

## Usage example

``` html
<!-- app.component.html -->
<div class="menuItem">
  <ul #navMenu>
    <li (click)="inkbarMove($event)">p1</li>
    <li (click)="inkbarMove($event)">p2</li>
    <li (click)="inkbarMove($event)">p3</li>
  </ul>
  <lib-inkbar [nextEle]="inkbarSubject" [color]="inkbarColor"></lib-inkbar>
</div>

```

``` css
.menuItem {
  position: relative;
}
```

``` typescript javascript
// app.component.ts
inkbarSubject: Subject<HTMLBaseElement> = new Subject();

inkbarColor = "purple";

inkbarMove = (ele: HTMLBaseElement | MouseEvent) => {
  if (ele instanceof MouseEvent) {
    ele = ele.target as HTMLBaseElement;
  }
  this.inkbarSubject.next(ele);
};
```