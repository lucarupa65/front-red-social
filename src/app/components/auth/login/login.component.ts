import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import * as customValidator from '../../../shared/validators/validator'
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  public formLogin = this.fb.group({
    email: ['usuario1@email.com', [Validators.required, Validators.pattern(customValidator.emailPattern)]],
    password: ['Abc123', [Validators.required, Validators.minLength(6)]],
  });

  public classLabel: string = 'block mb-1';
  public classinput: string =
    'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500';
  public classinputError: string =
    'w-full px-3 py-2 bg-red-600 border border-red-600 rounded focus:outline-none focus:border-red-700';


  isValidField( field:'email' | 'password') {
    if( this.formLogin.controls[field].errors && this.formLogin.controls[field].touched ) {
      return this.classinputError
    }
    return this.classinput
  }

  onSave() {
    if( this.formLogin.invalid ) {
      this.formLogin.markAllAsTouched();
      return
    }

    const { email, password } = this.formLogin.value;
    this.authService.login(email!,password!).subscribe({
      next: () => this.router.navigateByUrl('home'),
      error: (message) => {
        Swal.fire('Error', message, 'error' )
      }  
    })
  }

  register() {
    this.router.navigateByUrl('register')
  }

}
