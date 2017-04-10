import { Directive, ElementRef, Renderer } from '@angular/core';
@Directive({
  selector: '[bottonClick]'
})
export class bottonClickDirective {
  constructor(
    private el: ElementRef,
    private rander: Renderer) { }

  // string;
  // string;
  //@HostListener('mouseenter') onMouseEnter() {
  //this.highlight(this.highlightColor || this.defaultColor || 'red');
  //}
  //@HostListener('mouseleave') onMouseLeave() {
  //this.highlight(null);
  //}
  // string) {
  //this.el.nativeElement.style.backgroundColor = color;
  //}
}
