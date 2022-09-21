//import { FormControl, ValidatorFn, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms'

export function gte(control: AbstractControl): ValidationErrors | null {
    
    const v: number = +control.value;

    alert(v)

    //if (isNaN(v)) {
    //    return { 'gte': true, 'requiredValue': 1 }
    //}

    //if (v <= 0) {
    //    return { 'gte': false, 'requiredValue': 1 }
    //}

    return null

}