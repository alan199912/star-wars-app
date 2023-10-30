import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinner: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get spinner$() {
    return this.spinner.asObservable();
  }

  public show() {
    this.spinner.next(true);
  }

  public hide() {
    this.spinner.next(false);
  }
}
