import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AddComponent } from '../../components/feed/add/add.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AddComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { 
  private authService = inject(AuthService);

  public currentUser = computed(() => this.authService.currentUser());
  public hidden: boolean = true;





  Show() {
    this.hidden = !this.hidden
  }
}
