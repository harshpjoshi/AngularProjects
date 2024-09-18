import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustIncludeOneQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }

  return { mustIncludeOneQuestionMark: true };
}

function emailExists(control: AbstractControl) {
  if (control.value !== 'test@gmail.com') {
    return of(null);
  }

  return of({ emailExists: true });
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailExists],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustIncludeOneQuestionMark]
    })
  });

  get isValidEmail() {
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid;
  }

  get isValidPassword() {
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid;
  }

  ngOnInit() {

    const savedData = window.localStorage.getItem('save-login-form');

    if (savedData) {
      const data = JSON.parse(savedData);
      this.form.patchValue({ email: data.email });
    }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem('save-login-form', JSON.stringify({ email: value.email }));
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSubmit() {
    console.log(this.form);

    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    console.log(enteredEmail, enteredPassword);
  }

}
