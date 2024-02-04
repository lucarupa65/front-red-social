import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AddComponent } from '../../components/feed/add/add.component';
import { FeedService } from '../../services/feed.service';

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
  private feedServise = inject(FeedService);

  public currentUser = computed(() => this.authService.currentUser());
  public feeds = computed(() => this.feedServise.feedAll());
  public hidden: boolean = true;





  Show() {
    this.hidden = !this.hidden
  }
}
