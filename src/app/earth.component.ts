import { Component, Input, SimpleChanges } from "@angular/core";
import { Canvas } from "@nativescript/canvas";
import * as THREE from "three";
import {
  Color,
  CSSType,
  Page,
  SharedTransition,
  StackLayout,
} from "@nativescript/core";
import '@nativescript/canvas-polyfill';

const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
  specularMap: new THREE.TextureLoader().load("~/assets/texture/specularmap.jpg"),
  map: new THREE.TextureLoader().load("~/assets/texture/earthmap1k.jpg"),
  bumpMap: new THREE.TextureLoader().load("~/assets/texture/earthbump.jpg"),
  bumpScale: 0.3,
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);

const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);
const cloudMetarial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("~/assets/texture/earthCloud.png"),
  transparent: true,
});
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMetarial);

@CSSType("app-earth")
@Component({
  selector: "app-earth",
  template: ` <Canvas (ready)="onCanvasReady($event)"></Canvas> `,
})
export class EarthComponent extends StackLayout {
  canvas: Canvas;
  ctx: any;
  scene;
  camera;
  sphere;
  width;
  height;
  renderer: THREE.WebGLRenderer;
  @Input() parentPage: Page;
  private _animationFrameId: number | null;
  private _init = false;

  ngOnChanges(changes: SimpleChanges) {
    if (!this._init && changes.parentPage.currentValue) {
      this._init = true;
      this.parentPage.on('navigatingFrom', () => {
        console.log('navigatingFrom')
        if (typeof this._animationFrameId === 'number') {
          cancelAnimationFrame(this._animationFrameId)
          this._animationFrameId = null;
        }
      })
      this.parentPage.on('navigatedTo', () => {
        console.log('navigatedTo')
        if (this._animationFrameId === null) {
          setTimeout(() => {
            if (this.canvas) {
              this.setup();
            }
            this._animationFrameId = requestAnimationFrame(this.renderAnimation);

          })
        }
      })
    }
  }

  onWindowResize() {
    console.log('onWindowResize')
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    console.log(this.width, this.height)

    this.renderer.setSize(this.width, this.height);
  }

  onCanvasReady(args) {
    console.log('onCanvasReady')
    this.canvas = args?.object as Canvas;
    this.setup();
  }

  renderAnimation = () => {
    earthMesh.rotation.y -= 0.0015;
    cloudMesh.rotation.y += 0.0005;
    this.renderer.render(this.scene, this.camera);

    this._animationFrameId = requestAnimationFrame(this.renderAnimation);
    
  };

  setup() {
    console.log('canvas setup')
    this.ctx = this.canvas?.getContext(
      "webgl2"
    ) as unknown as WebGLRenderingContext;

    this.width = this.ctx.drawingBufferWidth;
    this.height = this.ctx.drawingBufferHeight;
      console.log('drawingbuffer:', this.width, this.height);
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      context: this.ctx,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.z = 2;

    this.scene.add(earthMesh);
    this.scene.add(cloudMesh);

    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(ambientlight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 3, 5);
    this.scene.add(pointLight);

    const Helper = new THREE.PointLightHelper(pointLight);
    this.scene.add(Helper);

    window.addEventListener("resize", this.onWindowResize);
    this._animationFrameId = requestAnimationFrame(this.renderAnimation);
  }
}
