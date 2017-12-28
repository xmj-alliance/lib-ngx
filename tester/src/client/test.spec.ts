import { async, TestBed, inject } from '@angular/core/testing';

import {
  Http, HttpModule, XHRBackend, BaseRequestOptions, Response, ResponseOptions
} from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';

import { DataService } from '../../../src/services/data/data.service';


describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      // providers: [
      //   {
      //     provide: Http, useFactory: (backend, options) => {
      //       return new Http(backend, options);
      //     },
      //     deps: [MockBackend, BaseRequestOptions]
      //   },
      //   MockBackend,
      //   BaseRequestOptions,
      //   DataService
      // ]
      providers: [
        DataService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

    // TestBed.configureTestingModule({
    //   providers: [
    //     {
    //       provide: Http, useFactory: (backend, options) => {
    //         return new Http(backend, options);
    //       },
    //       deps: [MockBackend, BaseRequestOptions]
    //     },
    //     MockBackend,
    //     BaseRequestOptions,
    //     DataService
    //   ]
    // });

  });

  describe('getData()', () => {

    it('Should get data array with length 5', inject([DataService, XHRBackend], async (dataService: DataService, mockBackend: MockBackend) => {
      const mockResponse = [
        { name: 'puma' },
        { name: 'Lod' },
        { name: 'TCL' },
        { name: 'systemctl' },
        { name: 'booklet' }
      ];

      const getMockData: () => Promise<any> = () => {
        return new Promise((resolve, reject) => {
          dataService.getData(null).subscribe(
            (next) => {
              console.log(next);
              resolve(next);
            },
            (err) => {
              reject(err);
            }
          );
        });
      };

      mockBackend.connections.subscribe((connection: MockConnection) => {
        // This is called every time someone subscribes to
        // an http call.
        // Here we want to fake the http response.
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })))
      });

      let res: any[] = await getMockData();
      expect(res.length).toBe(5);
    }));

  });

  // it('should get value', async(
  //   inject([DataService, MockBackend], (dataService: DataService, backend: MockBackend) => {

  //     backend.connections.subscribe((conn: MockConnection) => {
  //       const options: ResponseOptions = new ResponseOptions({body: 'hello'});
  //       conn.mockRespond(new Response(options));
  //     });

  //     dataService.getData('http://dummy.com').subscribe(res => {
  //       console.log('subcription called');
  //       expect(res).toEqual('hello');
  //     });
  //   })
  // ));



});