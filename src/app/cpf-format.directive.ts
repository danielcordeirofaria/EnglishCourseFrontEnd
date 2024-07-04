import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfFormat]'
})
export class CpfFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos do valor
    if (value.length > 3) {
      value = value.substring(0, 3) + '.' + value.substring(3);
    }
    if (value.length > 7) {
      value = value.substring(0, 7) + '.' + value.substring(7);
    }
    if (value.length > 11) {
      value = value.substring(0, 11) + '-' + value.substring(11, 13);
    }
    input.value = value;
  }
}
