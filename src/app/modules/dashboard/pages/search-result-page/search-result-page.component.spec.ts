import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultPageComponent } from './search-result-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

describe('SearchResultPageComponent', () => {
  let component: SearchResultPageComponent;
  let fixture: ComponentFixture<SearchResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultPageComponent],
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
