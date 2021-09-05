import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Repository } from '../models/repository.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() public repository: Repository = new Repository();
  @Output() close_card: EventEmitter<null> = new EventEmitter<null>();
  public closeCard() {
    this.close_card.emit();
  }

  public get data() {
    return this.repository.created_at.toLocaleString('ru-Ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
