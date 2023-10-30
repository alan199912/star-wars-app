import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

interface SearchResult {
  search: string;
  schema: string;
  data: any[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private search$: BehaviorSubject<SearchResult | null> = new BehaviorSubject<SearchResult | null>(null);

  public setSearch(search: SearchResult): void {
    this.search$.next(search);
  }

  public getSearch(): Observable<SearchResult | null> {
    return this.search$.asObservable();
  }

  constructor(private readonly http: HttpClient) {}

  public searchSchema(search: string, schema: string, page?: number): Observable<any> {
    const queryParams = [];

    queryParams.push(`search=${search}`);

    if (page) {
      queryParams.push(`page=${page}`);
    }

    const url = `${environment.API_URL}/${schema}?${queryParams.join('&')}`;

    return this.http.get<any>(url);
  }
}
