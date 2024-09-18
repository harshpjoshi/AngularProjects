import { afterNextRender, Component, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponent {

  private form = viewChild.required<NgForm>('form');

  constructor() {

    afterNextRender(() => {

      const savedForm = window.localStorage.getItem('saved-login-form');

      if (savedForm) {

        const localStorageData = JSON.parse(savedForm);
        const email = localStorageData.email;

        console.log('Saved email:', email);

        setTimeout(() => {
          this.form().controls['email'].setValue(email);
        }, 1);

      }

      this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => {
          window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }));
        }
      });

    });

  }

  onSubmit(formData: NgForm) {
    const enetredEmail = formData.value.email;
    const enteredPassword = formData.value.password;

    console.log(enetredEmail, enteredPassword);
  }

}
