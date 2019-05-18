import {Directive, HostListener, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

export class phoneMaskDirective {
  writeValue(value) {
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  onKeyup($event) {
    var valor = $event.target.value.replace(/\D/g, '');
    var pad = this.phoneMask.replace(/\D/g, '').replace(/9/g, '_');
    var valorMask = valor + pad.substring(0, pad.length - valor.length);
    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }
    if (valor.length <= pad.length) {
      this.onChange(valor);
    }
    var valorMaskPos = 0;
    valor = '';
    for (var i = 0; i < this.phoneMask.length; i++) {
      if (isNaN(parseInt(this.phoneMask.charAt(i)))) {
        valor += this.phoneMask.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }
    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }
    $event.target.value = valor;
  }

  onBlur($event) {
    if ($event.target.value.length === this.phoneMask.length) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
  }
}

phoneMaskDirective.decorators = [
  {
    type: Directive, args: [{
      selector: '[phoneMask]',
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: phoneMaskDirective,
        multi: true
      }]
    },]
  },
];
/** @nocollapse */
phoneMaskDirective.propDecorators = {
  "phoneMask": [{type: Input, args: ['phoneMask',]},],
  "onKeyup": [{type: HostListener, args: ['keyup', ['$event'],]},],
  "onBlur": [{type: HostListener, args: ['blur', ['$event'],]},],
};
