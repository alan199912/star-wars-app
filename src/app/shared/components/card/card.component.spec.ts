import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize variables', () => {
    expect(component.data).toBeUndefined();
    expect(component.schema).toBeUndefined();
    expect(component.element).toBeUndefined();
  });

  it('should call ngOnInit when the component is initialized', () => {
    spyOn(CardComponent.prototype, 'ngOnInit');

    const cardComponent = new CardComponent();

    cardComponent.ngOnInit();

    expect(cardComponent.ngOnInit).toHaveBeenCalled();
  });

  it('should call addFavorite when the method is called', () => {
    spyOn(CardComponent.prototype, 'addFavorite');

    const cardComponent = new CardComponent();

    cardComponent.addFavorite();

    expect(cardComponent.addFavorite).toHaveBeenCalled();
  });
});
