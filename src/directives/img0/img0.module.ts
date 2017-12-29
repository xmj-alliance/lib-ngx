import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// site directives
import { Img0Directive } from './img0.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [Img0Directive],
  declarations: [Img0Directive]
})
export class Img0Module { }