import { Injectable } from '@angular/core';
import { ImageSource } from '@nativescript/core';

@Injectable({
  providedIn: 'root'
})
export class SnapshotService {
  imageSource: ImageSource;
}
