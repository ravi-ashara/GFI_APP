import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Pipe({
  name: 'safeURL'
})
export class SafeURLPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) {}
  
  transform(value):SafeUrl {
    return this.sanitized.bypassSecurityTrustUrl(value);
  }

}
