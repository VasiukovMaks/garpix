import { Expose } from 'class-transformer';

export class Owner {
  @Expose() public readonly avatar_url: string = '';
  @Expose() public readonly html_url: string = '';
}
