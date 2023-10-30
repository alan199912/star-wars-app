import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { AiService } from 'src/app/core/services/ai/ai.service';

@Directive({
  selector: '[appImgAi]',
  standalone: true,
})
export class ImgAiDirective implements AfterViewInit {
  @Input() public name!: string;

  constructor(
    private readonly host: ElementRef,
    private readonly aiService: AiService
  ) {}

  public ngAfterViewInit(): void {
    this.host.nativeElement.src = 'assets/images/loading.gif';

    if (this.name) {
      this.aiService.generateImage(`${this.name}, about star wars`).subscribe({
        next: (res) => {
          console.log(res);
          const image = res.data[0].url;
          this.host.nativeElement.src = image;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
