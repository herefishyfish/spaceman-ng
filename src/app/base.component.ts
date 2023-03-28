import { Directive, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';

@Directive()
export abstract class BaseComponent {
  protected router = inject(RouterExtensions);

  constructor(
    private page: Page
  ) {
    this.page.actionBarHidden = true;
  }
}
