import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Characters, ResponseCharacters } from '../../models/characters.model';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(private readonly http: HttpClient) {}

  public getPopularCharacters(): Observable<Characters[]> {
    return this.http
      .get<ResponseCharacters>(`${environment.API_URL}/people`)
      .pipe(map((res) => res.results.slice(0, 5)));
  }

  public getSchema(schema: string, page: number): Observable<any> {
    const queryParams = [];

    if (page) {
      queryParams.push(`page=${page}`);
    }

    const url = `${environment.API_URL}/${schema}?${queryParams.join('&')}`;

    return this.http.get<any>(url);
  }

  public getSchemaById(schema: string, id: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/${schema}/${id}`);
  }

  public getPlanetsById(planets: string[]): Observable<any[]> {
    const observables = planets.map((url) => this.http.get(url));
    return forkJoin(observables);
  }

  public getPeopleById(people: string[]): Observable<any[]> {
    const observables = people.map((url) => this.http.get(url));
    return forkJoin(observables);
  }

  public getStarshipsById(starshipUrls: string[]): Observable<any[]> {
    const observables = starshipUrls.map((url) => this.http.get(url));
    return forkJoin(observables);
  }

  public getFilmsById(filmUrls: string[]): Observable<any[]> {
    const observables = filmUrls.map((url) => this.http.get(url));
    return forkJoin(observables);
  }
}
