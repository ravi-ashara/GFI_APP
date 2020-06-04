import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search.pipe';
import { SafeHTMLPipe } from './safeHTML/safe-html.pipe';
import { SafeURLPipe } from './safeURL/safe-url.pipe';

@NgModule({
    declarations: [SearchPipe, SafeHTMLPipe, SafeURLPipe],
    imports: [],
    exports: [SearchPipe, SafeHTMLPipe, SafeURLPipe]
})
export class PipesModule { }