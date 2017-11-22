import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// componets
import { InkbarComponent } from './inkbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [InkbarComponent],
  declarations: [InkbarComponent]
})
export class InkbarModule { }