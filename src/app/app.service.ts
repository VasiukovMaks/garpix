import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { Repository } from './models/repository.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  public get_repository(query: string): Observable<Repository[]> {
    const url: string = environment.endPoint + `search/repositories?q=${query}`;
    return this.httpClient
      .get(url)
      .pipe(
        map((res: any) =>
          res.items.map((item: object) =>
            plainToClass(Repository, item, { excludeExtraneousValues: true })
          )
        )
      );
  }
}
