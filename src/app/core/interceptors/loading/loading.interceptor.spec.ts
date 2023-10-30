import { TestBed } from '@angular/core/testing';

import { LoadingInterceptor } from './loading.interceptor';

describe('LoadingInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [LoadingInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: LoadingInterceptor = TestBed.inject(LoadingInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should call intercept when the method is called', () => {
    const interceptor: LoadingInterceptor = TestBed.inject(LoadingInterceptor);
    spyOn(LoadingInterceptor.prototype, 'intercept');
    interceptor.intercept(
      jasmine.createSpyObj('HttpRequest', ['clone']),
      jasmine.createSpyObj('HttpHandler', ['handle'])
    );
    expect(interceptor.intercept).toHaveBeenCalled();
  });
});
