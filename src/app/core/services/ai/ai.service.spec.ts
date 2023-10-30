import { TestBed } from '@angular/core/testing';
import { AiService } from './ai.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.prod';
import { of } from 'rxjs';

describe('AiService', () => {
  let service: AiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call generateImage when the method is called', () => {
    const expectedResponse = {
      created: 1625541600,
      data: [
        {
          url: 'https://cdn.example.com/your-mock-image.png',
        },
      ],
    };

    const mockService = jasmine.createSpyObj('AiService', ['generateImage']);
    mockService.generateImage.and.returnValue(of(expectedResponse));

    expect(mockService.generateImage).not.toHaveBeenCalled();
  });
});
