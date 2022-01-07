import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Repos } from "./repos";
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GithubRepoService {
    _url: string = 'https://api.github.com';
    _localServerUrl: string = 'http://localhost:8082';

    constructor(private http: HttpClient) { }

    getRepos(username: string): Observable<Repos[]> {
        let finalURL = `${this._url}/users/${username}/repos`;

        return this.http.get<Repos[]>(finalURL)
            .pipe(
                map((data) => {
                    return data;
                })
            );
    }

    addRepo(data: any): Observable<any> {
        let finalURL = `${this._localServerUrl}/post`;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const body = JSON.stringify(data);
        console.log(`Post data : ${body}`);

        //observe: 'response' options returns full http response
        return this.http.post(finalURL, body, { headers: headers, observe: 'response' });
    }
}