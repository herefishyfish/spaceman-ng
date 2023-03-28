import { Component } from '@angular/core';

@Component({
  selector: 'app-name',
  template: `
    <GridLayout backgroundColor="black">
      <!-- <app-earth backgroundColor="blue"></app-earth> -->
      <page-router-outlet></page-router-outlet>
    </GridLayout>
  `,
})
export class AppComponent {}
