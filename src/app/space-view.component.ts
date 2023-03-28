import { Component } from '@angular/core';
import { PageTransition, SharedTransition, SharedTransitionConfig, Screen } from '@nativescript/core';
import { BaseComponent } from './base.component';

@Component({
  selector: 'app-space-view',
  template: `
    <GridLayout rows="3*, 2*, 2*" marginTop="60">
      <app-earth row="0" sharedTransitionTag="earth"></app-earth>
      <!-- <Image src="~/assets/Earth.png" stretch="aspectFit" row="0" sharedTransitionTag="earth" width="75%"></Image> -->
      <Image src="~/assets/SpaceMan.png" stretch="aspectFill" row="0" rowSpan="2" sharedTransitionTag="spaceman"></Image>
      <GridLayout rows="160,auto,auto,auto,*" row="0" rowSpan="2" marginLeft="10" sharedTransitionTag="title">
        <Label row="1" class="space-title">SPACE</Label>
        <Label row="2" class="space-title">TRAVEL</Label>
        <Button row="3" class="space-tickets-available" width="55%" horizontalAlignment="left" (tap)="openModal($event)">
          TICKETS AVAILABLE
        </Button>
      </GridLayout>
      <StackLayout class="p-20" row="2" class="space-box-details" sharedTransitionTag="infobox">
        <StackLayout orientation="vertical" margin="15">
          <StackLayout orientation="horizontal">
            <ContentView width="150" height="100" boxShadow="0 0 1 1 rgba(0,0,0,.6)" borderRadius="20">
              <Image src="~/assets/Astronaut.jpg" stretch="aspectFill" sharedTransitionTag="astronaut" width="150" height="100" class="space-box-details-image"></Image>
            </ContentView>
            <StackLayout orientation="vertical" margin="15 0 0 10" verticalAlignment="top">
              <Label class="space-box-details-title">98% RATING</Label>
              <Label text="FIND OUT MORE" class="space-box-details-subtitle">FIND OUT MORE</Label>
            </StackLayout>
          </StackLayout>
        <Label textWrap="true" margin="10 0 0 0">{{descriptionText}}</Label>
      </StackLayout>
    </StackLayout>
  </GridLayout>
  `,
})
export class SpaceViewComponent extends BaseComponent {
  descriptionText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

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
        duration: global.isAndroid ? 800 : null,
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
        duration: 600,
        x: -Screen.mainScreen.widthDIPs,
        y: 0,
        opacity: 0,
      },
    };

    this.router.navigate(['/earth-view'], { transition: SharedTransition.custom(new PageTransition(), config) })
  }
}
