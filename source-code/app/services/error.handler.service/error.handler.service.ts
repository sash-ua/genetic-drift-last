import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ErrorHandlerService {
    constructor() { }

    handleError (error: any): Observable<ErrorHandlerService> {
        console.log(error); // log to console instead
        return Observable.throw(error);
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.