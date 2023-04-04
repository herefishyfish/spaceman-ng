import { Component, inject } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { Image } from "@nativescript/core";

@Component({
  selector: "app-earth-view",
  templateUrl: `earth-view.component.html`
})
export class EarthViewComponent {
  router = inject(RouterExtensions);
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
