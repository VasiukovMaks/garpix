import { Expose, Type } from 'class-transformer';
import { Owner } from './owner.model';

export class Repository {
  @Expose() public readonly name: string = '';
  @Expose() public readonly full_name: string = '';
  @Expose() public readonly html_url: string = '';
  @Expose() public readonly homepage: string = '';
  @Expose() public readonly description: string = '';
  @Expose() public readonly stargazers_count: number = 0;
  @Expose() public readonly language: string = '';
  @Expose() public readonly has_wiki: boolean = false;
  @Expose() public readonly open_issues: number = 0;
  @Expose() public readonly forks: number = 0;
  @Type(() => Date)
  @Expose()
  public readonly created_at: Date = new Date(Date.now());
  @Type(() => Owner)
  @Expose()
  public readonly owner: Owner = new Owner();
  public is_show: boolean = true;
}
