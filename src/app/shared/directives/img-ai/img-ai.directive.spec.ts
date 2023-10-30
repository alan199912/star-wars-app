import { of } from 'rxjs';
import { ImgAiDirective } from './img-ai.directive';

describe('ImgAiDirective', () => {
  it('should create an instance', () => {
    const ElementRefMock = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    const AiServiceMock = jasmine.createSpyObj('AiService', ['generateImage']);

    const directive = new ImgAiDirective(ElementRefMock, AiServiceMock);
    expect(directive).toBeTruthy();
  });

  it('should call ngAfterViewInit when the component is initialized', () => {
    const ElementRefMock = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    const AiServiceMock = jasmine.createSpyObj('AiService', ['generateImage']);

    spyOn(ImgAiDirective.prototype, 'ngAfterViewInit');

    const directive = new ImgAiDirective(ElementRefMock, AiServiceMock);

    directive.ngAfterViewInit();

    expect(directive.ngAfterViewInit).toHaveBeenCalled();
  });

  it('should call generateImage with the correct parameters and subscribe to the response', () => {
    const ElementRefMock = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    const AiServiceMock = jasmine.createSpyObj('AiService', ['generateImage']);

    const response = { data: [{ url: 'https://image.com' }] };

    AiServiceMock.generateImage.and.returnValue(of(response));

    const directive = new ImgAiDirective(ElementRefMock, AiServiceMock);

    directive.name = 'Luke Skywalker';

    directive.ngAfterViewInit();

    expect(AiServiceMock.generateImage).toHaveBeenCalledWith('Luke Skywalker, about star wars');
    expect(ElementRefMock.nativeElement.src).toEqual('https://image.com');
  });
});
