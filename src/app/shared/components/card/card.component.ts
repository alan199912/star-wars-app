import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementWithType } from 'src/app/core/models/favorite.model';
import { Characters } from 'src/app/core/models/characters.model';
import { Films } from 'src/app/core/models/films.model';
import { StarShips } from 'src/app/core/models/starships.model';
import { Planets } from 'src/app/core/models/planets.model';
import { RouterModule } from '@angular/router';
import { ImgAiDirective } from '../../directives/img-ai/img-ai.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ImgAiDirective],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public data!: Characters | Films | StarShips | Planets;
  @Input() public schema!: string;
  @Output() public sendFavorite: EventEmitter<ElementWithType> = new EventEmitter();
  public element!: ElementWithType;

  get getElementId(): string {
    return this.element?.url.split('/')[5];
  }

  ngOnInit(): void {
    this.element = this.data as ElementWithType;
  }

  public addFavorite(): void {
    this.sendFavorite.emit(this.element);
  }
}
