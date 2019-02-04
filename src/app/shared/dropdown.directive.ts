import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  constructor(private eleRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
