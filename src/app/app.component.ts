import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ImagePreviewComponent, 
    MatIconModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'image-app';
}
