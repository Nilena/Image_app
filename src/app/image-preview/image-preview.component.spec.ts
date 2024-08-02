import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagePreviewComponent } from './image-preview.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ImagePreviewComponent', () => {
  let component: ImagePreviewComponent;
  let fixture: ComponentFixture<ImagePreviewComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagePreviewComponent]
    }).compileComponents();
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

  it('should emit imagesList when files are selected', () => {
    spyOn(component.imagesList, 'emit');

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const event = { target: { files: [file] } } as unknown as Event;
    
    component.onFileSelected(event);

    const reader = new FileReader();
    reader.onload = () => {
      fixture.detectChanges();
      expect(component.imagesList.emit).toHaveBeenCalled();
      expect(component.imagesList.emit).toHaveBeenCalledWith([reader.result as string]);
    };
    reader.readAsDataURL(file);
  });

  it('should filter non-image files', () => {
    spyOn(component.imagesList, 'emit');

    const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
    const event = { target: { files: [file] } } as unknown as Event;
    
    component.onFileSelected(event);

    expect(component.imagesList.emit).not.toHaveBeenCalled();
  });
});
