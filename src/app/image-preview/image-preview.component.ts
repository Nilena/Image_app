import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { fromEvent, map, Observable } from 'rxjs';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, MatButtonModule, CommonModule],
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @Input() imageUrl: string | ArrayBuffer | null = null;
  @Output() imagesList = new EventEmitter<string[]>();

  transform: string = '';
  showGrid: boolean = false;
  scale: number = 1;
  rotateAngle: number = 0;
  flipHorizontal: boolean = false;
  flipVertical: boolean = false;

  uploadImage() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      const imageFiles = files.filter(file => file.type.startsWith('image/'));
      if (imageFiles.length > 0) {
      this.readFiles(files).subscribe(images => {
        this.imageUrl = images[0];  
        this.imagesList.emit(images);
      });
    }
    }
  }

  private readFiles(files: File[]): Observable<string[]> {
    const fileReaders = files.map(file => {
      const reader = new FileReader();
      const fileReader$ = fromEvent(reader, 'load').pipe(
        map(() => reader.result as string)
      );
      reader.readAsDataURL(file);
      return fileReader$;
    });
    return new Observable(observer => {
      let images: string[] = [];
      fileReaders.forEach(fileReader$ => {
        fileReader$.subscribe(image => {
          images.push(image);
          if (images.length === files.length) {
            observer.next(images);
            observer.complete();
          }
        });
      });
    });
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
