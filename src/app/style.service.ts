import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable, Subject} from 'rxjs/Rx';

@Injectable()
export class StyleService {
    // Observable string sources
    private theme = new Subject<any>();
    // Observable string streams
    theme$ = this.theme.asObservable();
    // Service message commands
    publishData(data: any) {
        this.theme.next(data);
    }

    constructor(private http: Http) {
    }

    // Get all posts from the API
    getStyle(image: string) {
        const body: {} = {
            image: image
        };
        return this.http.post('/api/style', body)
            .map(res => res.json());
    }
}
