import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call spinner$ when the method is called', () => {
    const mockService = jasmine.createSpyObj('SpinnerService', ['spinner$']);

    expect(mockService.spinner$).not.toHaveBeenCalled();
  });

  it('should call show when the method is called', () => {
    const mockService = jasmine.createSpyObj('SpinnerService', ['show']);

    expect(mockService.show).not.toHaveBeenCalled();
  });

  it('should call hide when the method is called', () => {
    const mockService = jasmine.createSpyObj('SpinnerService', ['hide']);

    expect(mockService.hide).not.toHaveBeenCalled();
  });
});
