import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color( value: string ) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors( value: ValidationErrors | null | undefined ) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle():void {
    if ( !this.htmlElement ) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage() {
    if ( !this.htmlElement ) return;

    if ( !this._errors ) {
      this.htmlElement.nativeElement.innerText = 'No errors';
      return;
    }

    const errors = Object.keys(this._errors);

    if ( errors.includes('required') ) {
      this.htmlElement.nativeElement.innerText = 'This field is required';
      return;
    }

    if ( errors.includes('minlength') ) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];

      this.htmlElement.nativeElement.innerText = `This field must be at least ${min} characters long. Do you have ${current} characters.`;
      return;
    }

    if ( errors.includes('email') ) {
      this.htmlElement.nativeElement.innerText = 'Invalid email address';
      return;
    }

  }

}
