# DataService
Densely frequently used Angular DataService for handling data interaction with back-end. Almost every Angular2+ project by @xmj-alliance or its members use this service.

## Features

- Get Data from back-end and wrap up as an Observable. If your dedicated data extract method is not provided, a default extract method will be implemented.

- Post JSON Data to back-end, then wrap server response as an Observable. You can also pass your custom header.

- Delete Data from back-end, wrapping server response up as an Observable.

## Usage example

Import `HttpModule` and `DataService` into the module.

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

Inject `DataService` into the component.

``` typescript
import { DataService } from "@xmj-alliance/lib-ngx";

export class AppComponent { 
  constructor(
    private dataService: DataService
  ) {  }
}
```

Some useful examples:

- Example 1 - Get specific data from a uri

  ``` typescript
  public getSpecificData: (uri) => Promise<any> = () => {
    return new Promise((resolve, reject) => {
      this.dataService.getData(uri).subscribe(
        (next) => {
          resolve(next);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  ngOnInit() {
    this.getSpecificData('https://jsonplaceholder.typicode.com/users').then((data)=>{console.log(data)});
  }
  ```

- Example 2 - Get game combat data from a uri, then convert date from string to Date object

  ``` typescript
  finalizeCombatData = (combat: any) => {
    let combats = res.json() || [];
    for (let combat of combats) {
      combat.stTime = new Date(combat.stTime);
      combat.edTime = new Date(combat.edTime);
      if (combat.stTime  < new Date("1971-01-01")) combat.stTime = null;
      if (combat.edTime   < new Date("1971-01-01")) combat.edTime = null;
    }
    return combats;
  };

  public getACombat: (id: string) => Promise<any> = (id) => {
    return new Promise((resolve, reject) => {
      this.dataService.getData(`/api/combat/${id}`, this.finalizeCombatData).subscribe(
        (next) => {
          resolve(next);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  ngOnInit() {
    this.getACombat("507f1f77bcf86cd799439011").then((combat)=>{console.log(combat)});
  }
  ```

- Example 3 - Post login form data to backend auth system

  ``` typescript
  public login: (loginForm) => Promise<any> = () => {
    return new Promise((resolve, reject) => {
      this.dataService.postJsonData(this.uri, loginForm).subscribe(
        (next) => {
          if (next.token) {
            // set token property
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify({ name: res.name, token: res.token }));
          }
          // login failed because of incorrect username or password || or server internal error
          resolve(next.status); // right or wrong shares
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  ngOnInit() {
    this.login({"name": "va", "password": "123456"}).then((status)=>{console.log(status)});
  }
  ```

- Example 4 - Send delete request to backend

  ``` typescript
  public deleteACriticalDoc: (name: string) => Promise<any> = (name) => {
    return new Promise((resolve, reject) => {
      this.dataService.deleteData(`/api/doc/${name}`).subscribe(
        (next) => {
          resolve(next);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  ngOnInit() {
    this.deleteACriticalDoc("windows.dll").then((status)=>{console.log(status)});
  }

  ```