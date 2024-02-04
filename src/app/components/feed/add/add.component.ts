import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedService } from '../../../services/feed.service';

@Component({
  selector: 'component-feed-add',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComponent { 
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private feedService = inject(FeedService);

  public classinput: string =
    'w-full px-3 py-2 bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500';
  public classinputError: string =
    'w-full px-3 py-2 bg-red-600 border border-red-600 focus:outline-none focus:border-red-700';

  public feedAddForm = this.fb.group({
    content: ['', [Validators.required]],
    title: ['', [Validators.required]]
  })

  public currentUser = computed(() => this.authService.currentUser());

  isValidField( field:'content' | 'title') {
    if( this.feedAddForm.controls[field].errors && this.feedAddForm.controls[field].touched ) {
      return this.classinputError
    }
    return this.classinput
  }

  onSave() {
    if( this.feedAddForm.invalid ) {
      this.feedAddForm.markAllAsTouched();
      return
    }

    const { content,title } = this.feedAddForm.value;
    this.feedService.save(content!,title!).subscribe({
      next: (data) => {
        this.feedAddForm.reset();
      }
    })
  }
}
