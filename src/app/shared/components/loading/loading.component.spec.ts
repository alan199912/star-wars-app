import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should initializate variables`, () => {
    expect(component.isShowSpinner).toBeFalsy();
  });

  it('should call ngOnInit when the component is initialized', () => {
    spyOn(LoadingComponent.prototype, 'ngOnInit');

    const loadingComponent = new LoadingComponent(jasmine.createSpyObj('SpinnerService', ['spinner$']));

    loadingComponent.ngOnInit();

    expect(loadingComponent.ngOnInit).toHaveBeenCalled();
  });
});
