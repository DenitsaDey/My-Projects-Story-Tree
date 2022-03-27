import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

//when specific custom validation of email is required 
export function emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    // if (control.errors && Object.keys(control.errors).filter(errorName => errorName !== 'email').length > 0) {
    //     return null;
    // }

    if (!value) {
        return null
    }

    //specific email conditions are required, i.e. min 6 symbols before @ and the domain to be gmail with top level domain .bg or .com
    if (!/.{6,}@gmail\.(bg|com)/.test(value)) {
        return {
            email: true,
        }
    }
    return null;
}


export function passwordMatch(passwordFormControl: AbstractControl) {
    const validtorFn: ValidatorFn = (confirmPasswordFormControl: AbstractControl) => {
        if (passwordFormControl.value !== confirmPasswordFormControl.value) {
            return {
                passwordMissmatch: true
            }
        }

        return null;
    }

    return validtorFn;
}


/*this is used when the passwords are in a separate FormGroup in the register.component.ts, i.e.
'passwords': new FormGroup({ 
    password: new FormControl('', [Validators.required]), 
    confirmPassword: new FormControl('', [Validators.required])})
*/
export function passwordMatch2(passwordFormControl: AbstractControl): ValidationErrors | null {
    const passwordGroup = passwordFormControl.parent as FormGroup;

    if (!passwordGroup) {
        return null;
    }

    const { password, rePassword } = passwordGroup.controls;
    if (password.value !== rePassword.value) {
        return {
            passwordMatch2: true
        }
    }

    return null;
}