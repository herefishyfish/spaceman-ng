import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  inject,
} from "@angular/core";
import { Canvas } from "@nativescript/canvas";
import * as THREE from "three";
import { CSSType, GridLayout, ImageSource, Page } from "@nativescript/core";
import "@nativescript/canvas-polyfill";
import { SnapshotService } from "./snapshot.service";

const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
  specularMap: new THREE.TextureLoader().load(
    "~/assets/texture/specularmap.jpg"
  ),
  map: new THREE.TextureLoader().load("~/assets/texture/earthmap1k.jpg"),
  bumpMap: new THREE.TextureLoader().load("~/assets/texture/earthbump.jpg"),
  bumpScale: 0.3,
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);

const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);
const cloudMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("~/assets/texture/earthCloud.png"),
  transparent: true,
});
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
const pointLight = new THREE.PointLight(0xffffff, 1);
const Helper = new THREE.PointLightHelper(pointLight);
pointLight.position.set(5, 3, 5);

const scene = new THREE.Scene();
scene.add(earthMesh);
scene.add(cloudMesh);
scene.add(pointLight);
scene.add(ambientlight);
scene.add(Helper);

@CSSType("app-earth")
@Component({
  selector: "app-earth",
  template: `
    <Image stretch="aspectFit" [src]="snap.imageSource"></Image>
    <Canvas (ready)="onCanvasReady($event)"></Canvas>
  `,
})
export class EarthComponent extends GridLayout implements OnChanges {
  canvas: Canvas;
  ctx: any;
  scene;
  camera;
  width;
  height;
  renderer: THREE.WebGLRenderer;
  @Input() parentPage: Page;
  private _animationFrameId: number | null;
  private _init = false;

  constructor(public snap: SnapshotService) {
    super();
    this._animationFrameId = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this._init && changes.parentPage.currentValue) {
      this._init = true;
      this.parentPage.on("navigatingFrom", () => {
        if (typeof this._animationFrameId === "number") {
          cancelAnimationFrame(this._animationFrameId);
          this._animationFrameId = null;
        }

        this.snap.imageSource = this.canvas.snapshot();
      });
      this.parentPage.on("navigatedTo", () => {
        if (this._animationFrameId === null) {
          if (this.canvas) {
            this.setup();
          }
          this._animationFrameId = requestAnimationFrame(this.renderAnimation);

          this.snap.imageSource = this.canvas.snapshot();
        }
      });
    }
  }

  onCanvasReady(args) {
    this.canvas = args?.object as Canvas;

    this.setup();
  }

  renderAnimation = () => {
    earthMesh.rotation.y -= 0.0015;
    cloudMesh.rotation.y -= 0.0005;
    this.renderer.render(scene, this.camera);

    this._animationFrameId = requestAnimationFrame(this.renderAnimation);
  };

  setup() {
    this.ctx = this.canvas?.getContext(
      "webgl2"
    ) as unknown as WebGLRenderingContext;

    this.width = this.ctx.drawingBufferWidth;
    this.height = this.ctx.drawingBufferHeight;
    this.renderer = new THREE.WebGLRenderer({
      context: this.ctx,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.camera = new THREE.PerspectiveCamera(
      50,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.z = 2;

    this.renderAnimation();
  }
}
