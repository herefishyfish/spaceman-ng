import { Component } from '@angular/core';

@Component({
  selector: 'app-name',
  template: `
    <GridLayout backgroundColor="black">
      <page-router-outlet actionBarVisibility="never"></page-router-outlet>
    </GridLayout>
  `,
})
export class AppComponent {}
