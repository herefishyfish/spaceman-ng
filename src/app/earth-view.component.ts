import { Component, inject, NgZone } from "@angular/core";
import { Image } from "@nativescript/core";
import { BaseComponent } from "./base.component";

@Component({
  selector: "app-earth-view",
  template: `
    <GridLayout rows="*, *, *, *">
      <StackLayout
        orientation="horizontal"
        margin="10"
        row="0"
        verticalAlignment="top"
        sharedTransitionTag="back-button"
      >
        <Image
          src="~/assets/back.png"
          (tap)="close()"
          stretch="aspectFill"
          color="white"
          width="20"
          height="20"
          horizontalAlignment="right"
          backgroundColor="black"
        ></Image>
        <Button
          (tap)="close()"
          color="white"
          backgroundColor="black"
          horizontalAlignment="left"
          width="50"
          margin="0 0 0 0"
          >Back</Button
        >
      </StackLayout>
      <GridLayout
        row="1"
        rowSpan="2"
        rows="auto,auto,auto"
        verticalAlignment="top"
        orientation="vertical"
        sharedTransitionTag="earth-info"
      >
        <Label color="white" verticalAlignment="top" class="planet-title"
          >EARTH</Label
        >
        <Label row="1" textWrap="true" class="planet-details" width="70%"
          >Earth is the third planet from the Sun and the only object in the
          universe known to harbor life.</Label
        >
        <Image
          row="2"
          src="~/assets/Moon.png"
          stretch="aspectFit"
          sharedTransitionTag="moon"
          width="80"
          height="80"
          horizontalAlignment="right"
          marginRight="20"
        ></Image>
      </GridLayout>
      <GridLayout rows="*" row="2" rowSpan="2">
        <app-earth row="0" sharedTransitionTag="earth"></app-earth>
        <!-- <Image
          src="~/assets/Earth.png"
          stretch="aspectFit"
          row="0"
          sharedTransitionTag="earth"
        ></Image> -->
      </GridLayout>

      <android>
        <GridLayout
          rows="3*, 2*"
          marginTop="60"
          rowSpan="4"
          (loaded)="loadedIncoming($event)"
        >
          <Image
            src="~/assets/SpaceMan.png"
            stretch="aspectFill"
            sharedTransitionTag="spaceman"
            scaleX="8"
            scaleY="8"
            translateY="940"
          ></Image>

          <GridLayout
            rows="160,auto,auto,auto,*"
            row="0"
            marginLeft="10"
            sharedTransitionTag="title"
            translateX="-300"
          >
            <Label row="1" class="space-title">SPACE</Label>
            <Label row="2" class="space-title">TRAVEL</Label>
            <Button
              row="3"
              text=""
              class="space-tickets-available"
              width="55%"
              horizontalAlignment="left"
              >TICKETS AVAILABLE</Button
            >
          </GridLayout>
          <StackLayout
            class="p-20"
            row="1"
            class="space-box-details"
            sharedTransitionTag="infobox"
            translateY="400"
          >
            <StackLayout orientation="vertical" margin="15">
              <StackLayout orientation="horizontal">
                <ContentView
                  width="150"
                  height="100"
                  boxShadow="0 0 1 1 rgba(0,0,0,.6)"
                  borderRadius="20"
                >
                  <Image
                    src="~/assets/Astronaut.jpg"
                    stretch="aspectFill"
                    sharedTransitionTag="astronaut"
                    width="150"
                    height="100"
                    class="space-box-details-image"
                  ></Image>
                </ContentView>
                <StackLayout
                  orientation="vertical"
                  margin="15 0 0 10"
                  verticalAlignment="top"
                >
                  <Label class="space-box-details-title">98% RATING</Label>
                  <Label class="space-box-details-subtitle"
                    >FIND OUT MORE</Label
                  >
                </StackLayout>
              </StackLayout>
              <Label textWrap="true" margin="10 0 0 0">{{
                descriptionText
              }}</Label>
            </StackLayout>
          </StackLayout>
        </GridLayout>
      </android>
    </GridLayout>
  `,
})
export class EarthViewComponent extends BaseComponent {
  descriptionText: any = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  close() {
    this.router.back();
  }
  loadedIncoming(args: any) {
    const image = <Image>args.object;
    image
      .animate({
        opacity: 0,
        duration: 2000,
      })
      .then(() => {})
      .catch(() => {});
  }
}
