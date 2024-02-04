import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as customValidator from '../../../shared/validators/validator';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public registerForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(customValidator.emailPattern)],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ],
    ],
    fullName: [
      '',
      [
        Validators.required,
        Validators.pattern(customValidator.firstNameAndLastnamePattern),
      ],
    ],
    Age: [Validators.required, Validators.min(0)],
  });

  public classLabel: string = 'block mb-1';
  public classinput: string =
    'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500';
  public classinputError: string =
    'w-full px-3 py-2 bg-red-600 border border-red-600 rounded focus:outline-none focus:border-red-700';

  isValidField(field: 'email' | 'password' | 'fullName' | 'Age') {
    if (
      this.registerForm.controls[field].errors &&
      this.registerForm.controls[field].touched
    ) {
      return this.classinputError;
    }
    return this.classinput;
  }

  onSave() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { email, password, Age, fullName } = this.registerForm.value;
    this.authService.register(email!, password!, Age!, fullName!).subscribe({
      next: () => this.router.navigateByUrl('home'),
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }

  login() {
    this.router.navigateByUrl('login');
  }
}
