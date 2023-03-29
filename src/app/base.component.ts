import { Directive, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';

@Directive()
export abstract class BaseComponent {
  router = inject(RouterExtensions);
  page = inject(Page);

}
