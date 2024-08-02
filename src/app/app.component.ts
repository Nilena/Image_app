import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ImagePreviewComponent, MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'image-app';
  images: string[] = [];
  currentIndex: number = 0;

  onImagesUpdated(images: string[]) {
    this.images = images;
    this.currentIndex = 0; 
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }
}