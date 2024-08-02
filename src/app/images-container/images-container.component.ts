import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-images-container',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './images-container.component.html',
  styleUrl: './images-container.component.css'
})
export class ImagesContainerComponent {
  currentIndex: number = 0; 
  @Input() images: string []=[];

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
