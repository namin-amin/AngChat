import { Directive } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]',
  standalone: true,
})
export class ScrollToBottomDirective {
  constructor() {}
}
