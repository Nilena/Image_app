import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagesContainerComponent } from './images-container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('ImagesContainerComponent', () => {
  let component: ImagesContainerComponent;
  let fixture: ComponentFixture<ImagesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesContainerComponent, MatButtonModule, MatIconModule, CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the first image by default', () => {
    const images = ['image1.png', 'image2.png'];
    component.images = images;
    component.currentIndex = 0;
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toContain('image1.png');
  });

  it('should navigate to the next image', () => {
    const images = ['image1.png', 'image2.png'];
    component.images = images;
    component.currentIndex = 0;
    fixture.detectChanges();

    component.nextImage();
    fixture.detectChanges();

    expect(component.currentIndex).toBe(1);
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toContain('image1.png');
  });

  it('should not navigate to the next image if at the last image', () => {
    const images = ['image1.png', 'image2.png'];
    component.images = images;
    component.currentIndex = 1; 
    fixture.detectChanges();

    component.nextImage();
    fixture.detectChanges();

    expect(component.currentIndex).toBe(1); 
  });

  it('should navigate to the previous image', () => {
    const images = ['image1.png', 'image2.png'];
    component.images = images;
    component.currentIndex = 1; 
    fixture.detectChanges();

    component.prevImage();
    fixture.detectChanges();

    expect(component.currentIndex).toBe(0);
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toContain('image1.png');
  });

  it('should not navigate to the previous image if at the first image', () => {
    const images = ['image1.png', 'image2.png'];
    component.images = images;
    component.currentIndex = 0; 
    fixture.detectChanges();

    component.prevImage();
    fixture.detectChanges();

    expect(component.currentIndex).toBe(0); 
  });

  it('should update images and reset index when onImagesUpdated is called', () => {
    const initialImages = ['image1.png', 'image2.png'];
    component.images = initialImages;
    component.currentIndex = 1; 
    fixture.detectChanges();

    const newImages = ['image3.png', 'image4.png'];
    component.onImagesUpdated(newImages);
    fixture.detectChanges();

    expect(component.images).toEqual(newImages);
    expect(component.currentIndex).toBe(0); 
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toContain('image3.png');
  });
});
