import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [
    CommonModule,RouterOutlet
  ],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicComponent { }
