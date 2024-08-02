import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagePreviewComponent } from './image-preview.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { Observable, fromEvent } from 'rxjs';
import { DebugElement } from '@angular/core';

describe('ImagePreviewComponent - Image Upload', () => {
  let component: ImagePreviewComponent;
  let fixture: ComponentFixture<ImagePreviewComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ImagePreviewComponent,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule
      ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePreviewComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read and emit image files', (done) => {
    spyOn(component.imagesList, 'emit');
  
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const event = new Event('change') as any;
    Object.defineProperty(event, 'target', {
      writable: true,
      value: { files: [file] }
    });
  
    component.onFileSelected(event);
  
    const reader = new FileReader();
    reader.onload = () => {
      fixture.detectChanges();
      expect(component.imagesList.emit).toHaveBeenCalled();
      expect(component.imagesList.emit).toHaveBeenCalledWith([reader.result as string]);
      done(); 
    };
    reader.readAsDataURL(file);
  });
});
