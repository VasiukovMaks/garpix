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

  public repositoryList: Repository[] = [];
  public select_repository: Repository | null = null;
  public searchQuery: string = '';

  public languages: string[] = [];
  public has_wiki: string[] = ['Показать с вики', 'Показать без вики'];

  public get_repository(query: string): Observable<Repository[]> {
    const url: string = environment.endPoint + `search/repositories?q=${query}`;
    return this.httpClient.get(url).pipe(
      map((res: any) => {
        this.repositoryList = res.items.map((item: object) =>
          plainToClass(Repository, item, { excludeExtraneousValues: true })
        );
        this.languages = [];
        this.repositoryList.forEach((repository) => {
          if (
            !this.languages.includes(repository.language) &&
            repository.language
          ) {
            this.languages.push(repository.language);
          }
        });
        return this.repositoryList;
      })
    );
  }

  public filterRepositories(selectLanguage: string, wikiIsSelect: string) {
    this.repositoryList.forEach((repository) => {
      if (selectLanguage && wikiIsSelect) {
        const wikiIsShow = wikiIsSelect === 'Показать с вики';
        repository.is_show =
          selectLanguage === repository.language &&
          repository.has_wiki === wikiIsShow;
      } else if (selectLanguage) {
        repository.is_show = selectLanguage === repository.language;
      } else if (wikiIsSelect) {
        const wikiIsShow = wikiIsSelect === 'Показать с вики';
        repository.is_show = repository.has_wiki === wikiIsShow;
      } else {
        repository.is_show = true;
      }
    });
  }
}
