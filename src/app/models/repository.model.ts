import { Expose } from 'class-transformer';

export class Repository {
  @Expose() public readonly name: string = '';
  @Expose() public readonly description: string = '';
  @Expose() public readonly stargazers_count: number = 0;
  @Expose() public readonly language: string = '';
  @Expose() public readonly has_wiki: boolean = false;
  public is_show: boolean = true;
}
