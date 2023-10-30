import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SCHEMAS } from 'src/app/core/constants/schemas.constants';
import { SearchService } from 'src/app/core/services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchForm!: FormGroup;
  public schemas = SCHEMAS;

  constructor(
    private readonly fb: FormBuilder,
    private readonly searchService: SearchService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
      filter: ['', Validators.required],
    });
  }

  public search(): void {
    if (!this.searchForm) {
      return;
    }

    if (!this.searchForm.valid) {
      return;
    }

    this.searchService
      .searchSchema(this.searchForm.value.search, this.searchForm.value.filter)
      .subscribe({
        next: (data) => {
          this.searchService.setSearch({
            search: this.searchForm.value.search,
            schema: this.searchForm.value.filter,
            data: data.results,
          });
          this.router.navigate(['/dashboard/search-result']);
        },
        error: (error) => {
          console.log('error', error);
        },
      });
  }
}
