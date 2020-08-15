import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {}

    getAllLocations(): Observable<any> {
        return this.http.get<any>(environment.API_ENDPOINT + '/listAll');
    }

    findNearbyLocations(path): Observable<any> {
        return this.http.get<any>(environment.API_ENDPOINT + '/nearbyMe' + path);
    }
}
