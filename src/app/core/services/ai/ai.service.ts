import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

interface AiResponse {
  created: number;
  data: DataUrl[];
}

interface DataUrl {
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(private readonly http: HttpClient) {}

  public generateImage(prompt: string): Observable<AiResponse> {
    return this.http.post<AiResponse>(
      `${environment.API_URL_AI}`,
      {
        prompt,
        n: 2,
        size: '1024x1024',
      },
      {
        headers: {
          Authorization: `Bearer ${environment.API_KEY}`,
        },
      }
    );
  }
}
