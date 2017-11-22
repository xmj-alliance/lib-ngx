# DataService
Densely frequently used Angular DataService for handling data interaction with back-end. Almost every Angular2+ project by @xmj-alliance or its members use this service.

## Features

- Get Data from back-end and wrap up as an Observable. If your dedicated data extract method is not provided, a default extract method will be implemented.

- Post JSON Data to back-end, then wrap server response as an Observable. You can also pass your custom header.

- Delete Data from back-end, wrapping server response up as an Observable.

## Usage example

``` typescript javascript
// app.module.ts
import { HttpModule } from '@angular/http';
import { DataService } from "@xmj-alliance/lib-ngx";

@NgModule({
  imports: [
    //...
    HttpModule
  ],
  //...
  providers: [
    // ...
    DataService
  ]
})
export class AppModule { }

```

``` typescript javascript
// app.component.ts

import { DataService } from "@xmj-alliance/lib-ngx";

export class AppComponent implements OnInit { 
  constructor(
    private dataService: DataService
  ) {  }

  ngOnInit() {
    this.dataService.getData('https://jsonplaceholder.typicode.com/users').subscribe(
      (next) => {
        console.log(next);
      }
    );
  }
}

```