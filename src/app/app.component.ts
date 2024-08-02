import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { ImagesContainerComponent } from './images-container/images-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImagePreviewComponent, ImagesContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'image-app';
  images: string[] = []; 

  onImagesUpdated(images: string[]) {
    this.images = images;
  }
}