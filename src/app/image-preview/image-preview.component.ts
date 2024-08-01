import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule,MatCardModule,MatButtonModule,CommonModule],
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.css'
})
export class ImagePreviewComponent {
  @ViewChild('image', { static: false }) image!: ElementRef;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  imageUrl: string | ArrayBuffer | null = '';
  transform: string = '';
  showGrid: boolean = false;
  scale: number = 1;
  rotateAngle: number = 0;

  
  flipHorizontal: boolean = false;
  flipVertical: boolean = false;

  uploadImage(event: Event): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => this.imageUrl = reader.result;
      reader.readAsDataURL(input.files[0]);
    }
  }

  zoomIn(): void {
    this.scale += 0.1;
    this.applyTransform();
  }

  zoomOut(): void {
    if (this.scale > 0.1) {
      this.scale -= 0.1;
      this.applyTransform();
    }
  }

  toggleGrid(): void {
    this.showGrid = !this.showGrid;
  }

  rotate(degrees: number): void {
    this.rotateAngle += degrees;
    this.applyTransform();
  }

  flip(direction: string): void {
    if (direction === 'horizontal') {
      this.flipHorizontal = !this.flipHorizontal;
    } else if (direction === 'vertical') {
      this.flipVertical = !this.flipVertical;
    }
    this.applyTransform();
  }

  resetImage(): void {
    this.scale = 1;
    this.rotateAngle = 0;
    this.flipHorizontal = false;
    this.flipVertical = false;
    this.transform = '';
  }

  applyTransform(): void {
    const flipHor = this.flipHorizontal ? -1 : 1;
    const flipVer = this.flipVertical ? -1 : 1;
    this.transform = `scale(${this.scale * flipHor}, ${this.scale * flipVer}) rotate(${this.rotateAngle}deg)`;
  }
}