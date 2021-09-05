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
  constructor(public service: AppService) {}

  public is_loaded: boolean = true;

  // Фильтры
  public languageControl = new FormControl();
  public wikiControl = new FormControl();
  public empty_list: boolean = false;

  public async getRepository(event: string) {
    if (event) {
      this.is_loaded = false;

      await this.service.get_repository(event).subscribe(() => {
        this.is_loaded = true;
      });
    }
  }

  public identificate(index: number): number {
    return index;
  }

  // Расчет плавающей точки и еденицы измерения
  public stargazersCount(rep: Repository) {
    const power = Math.floor((rep.stargazers_count.toString().length - 1) / 3);
    return (
      (rep.stargazers_count / 10 ** (3 * power)).toFixed(power || 0) +
      (power === 1 ? 'k' : '')
    );
  }

  public onFilterChange() {
    const selectLanguage: string = this.languageControl.value;
    let wikiIsSelect: string = this.wikiControl.value;

    this.service.filterRepositories(selectLanguage, wikiIsSelect);

    this.empty_list = !this.service.repositoryList.some(
      (repository) => repository.is_show
    );
  }

  public closeCard() {
    this.service.select_repository = null;
  }
}
