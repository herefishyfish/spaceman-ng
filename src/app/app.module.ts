import { NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import {
  NativeScriptCommonModule,
  NativeScriptModule,
  NativeScriptRouterModule,
  registerElement,
} from "@nativescript/angular";
import { CanvasModule } from "@nativescript/canvas/angular";

registerElement("Canvas", () => require("@nativescript/canvas").Canvas);

import { AppComponent } from "./app.component";

import { SpaceViewComponent } from "./space-view.component";
import { EarthViewComponent } from "./earth-view.component";
import { EarthComponent } from "./earth.component";

registerElement("app-earth", () => EarthComponent);

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    SpaceViewComponent,
    EarthViewComponent,
    EarthComponent,
  ],
  imports: [
    CanvasModule,
    NativeScriptModule,
    NativeScriptCommonModule,
    NativeScriptRouterModule.forRoot([
      { path: "", redirectTo: "/space-view", pathMatch: "full" },
      { path: "space-view", component: SpaceViewComponent },
      { path: "earth-view", component: EarthViewComponent },
    ]),
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
