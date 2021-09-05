import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Repository } from './models/repository.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private service: AppService) {}

  public searchQuery: string = '';
  public repList: Repository[] = [];
  public is_loaded: boolean = true;

  // Селекты для фильторв
  public languages: string[] = [];
  public has_wiki: string[] = ['Показать без вики', 'Показать с вики'];
  public languageControl = new FormControl();
  public wikiControl = new FormControl();
  public empty_list: boolean = false;

  public async log(event: string) {
    if (event) {
      this.is_loaded = false;
      await this.service.get_repository(event).subscribe((response) => {
        this.repList = response;
        this.languages = [];
        this.repList.forEach((repository) => {
          if (
            !this.languages.includes(repository.language) &&
            repository.language
          ) {
            this.languages.push(repository.language);
          }
        });

        this.is_loaded = true;
      });
    }
  }

  public identificate(index: number): number {
    return index;
  }

  public stargazersCount(rep: Repository) {
    const a = Math.floor((rep.stargazers_count.toString().length - 1) / 3);
    return (
      (rep.stargazers_count / 10 ** (3 * a)).toFixed(a === 1 ? 1 : 0) +
      (a === 1 ? 'k' : '')
    );
  }

  public onFilterChange() {
    const selectLanguage: string = this.languageControl.value;
    let wikiIsSelect: string | boolean = this.wikiControl.value;
    this.repList.forEach((repository) => {
      if (selectLanguage && wikiIsSelect) {
        const a = wikiIsSelect === 'Показать с вики';
        repository.is_show =
          selectLanguage === repository.language && repository.has_wiki === a;
      } else if (selectLanguage) {
        repository.is_show = selectLanguage === repository.language;
      } else if (wikiIsSelect) {
        const a = wikiIsSelect === 'Показать с вики';
        repository.is_show = repository.has_wiki === a;
      } else {
        repository.is_show = true;
      }
    });
    this.empty_list = !this.repList.some((repository) => repository.is_show);
  }
}
