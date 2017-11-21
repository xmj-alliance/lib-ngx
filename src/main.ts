// polyfills, comment the following out for debugging purpose
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

// The app module
import { NgModule } from '@angular/core';

import { InkbarModule }  from './inkbar/inkbar.module';

@NgModule({
  imports: [InkbarModule]
})
export class LibNGX { }