import { Component, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { PageTransition, SharedTransition, SharedTransitionConfig, Screen, Page } from '@nativescript/core';

@Component({
  selector: 'app-space-view',
  templateUrl: `space-view.component.html`
})
export class SpaceViewComponent {
  page = inject(Page);
  router = inject(RouterExtensions);
  descriptionText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...';

  constructor() {
    this.page.reusable = false;
  }

  openModal(event) {
    const config: SharedTransitionConfig = {
      pageStart: {

        x: -Screen.mainScreen.widthDIPs,
        y: 0,
        // Try commenting above values and uncommenting these...
        // x: 0,
        // y: -300,
      },
      pageEnd: {
        // use nice linear duration on Android
        duration: global.isAndroid ? 800 : 250,
        // use custom spring on iOS
        spring: { tension: 60, friction: 8, mass: 4 },
        opacity: 1,
        sharedTransitionTags: {
          spaceman: {
            opacity: 0,
            y: 20,
            scale: {
              x: 6,
              y: 6,
            },
          },
          title: {
            opacity: 0,
            x: -200,
          },
          infobox: {
            opacity: 0,
            y: 800,
          },
        },
      },
      pageReturn: {
        duration: 250,
        x: -Screen.mainScreen.widthDIPs,
        y: 0,
        opacity: 0,
      },
    };

    this.router.navigate(['/earth-view'], { transition: SharedTransition.custom(new PageTransition(), config) })
  }
}
