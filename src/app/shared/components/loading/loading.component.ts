import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  public isShowSpinner: boolean = false;

  constructor(private readonly spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.spinner$.subscribe((value) => (this.isShowSpinner = value));
  }
}
