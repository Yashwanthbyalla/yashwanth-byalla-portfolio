import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-background',
  standalone: true,
  template: `<canvas #threeCanvas class="three-canvas"></canvas>`,
  styleUrls: ['./three-background.component.scss']
})
export class ThreeBackgroundComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationId!: number;
  private spheres: THREE.Mesh[] = [];


  ngOnInit() {}

  ngAfterViewInit() {
    this.initThree();
    this.createScene();
    this.setupEventListeners();
    this.animate();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.renderer?.dispose();
  }

  private initThree() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0a0a, 0.0005);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 5, 15);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x0a0a0a, 1);
  }

  private createScene() {
    // Dark gradient background
    const bgGeometry = new THREE.SphereGeometry(500, 32, 32);
    const bgMaterial = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x1a1a2e) },
        bottomColor: { value: new THREE.Color(0x0f0f23) }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(h * 0.5 + 0.5, 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide
    });
    const background = new THREE.Mesh(bgGeometry, bgMaterial);
    this.scene.add(background);

    // Floating particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    this.scene.add(particles);

    // Create 3 beautiful floating spheres positioned on sides
    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sphereColors = [0x00d4ff, 0xff6b6b, 0x4ecdc4];
    const spherePositions = [
      { x: -20, y: 8, z: -5 },   // Left side
      { x: 18, y: 3, z: 0 },    // Right side
      { x: -15, y: -2, z: 5 }   // Left side lower
    ];
    
    for (let i = 0; i < 3; i++) {
      const material = new THREE.MeshStandardMaterial({
        color: sphereColors[i],
        metalness: 0.7,
        roughness: 0.3,
        emissive: sphereColors[i],
        emissiveIntensity: 0.1,
        transparent: true,
        opacity: 0.8
      });
      
      const sphere = new THREE.Mesh(sphereGeometry, material);
      sphere.position.set(
        spherePositions[i].x,
        spherePositions[i].y,
        spherePositions[i].z
      );
      sphere.userData = {
        initialY: sphere.position.y,
        initialX: sphere.position.x,
        initialZ: sphere.position.z,
        speedRotation: Math.random() * 0.02 + 0.01,
        floatSpeed: Math.random() * 0.8 + 0.5
      };
      
      this.spheres.push(sphere);
      this.scene.add(sphere);
    }

    // Professional lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 5);
    this.scene.add(directionalLight);

    // Colored lights for spheres
    sphereColors.forEach((color, index) => {
      const light = new THREE.PointLight(color, 1, 30);
      light.position.copy(this.spheres[index].position);
      light.position.y += 3;
      this.scene.add(light);
    });
  }

  private setupEventListeners() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.001;
    const scrollY = window.scrollY;

    // Animate the 3 spheres with smooth movement
    this.spheres.forEach((sphere, index) => {
      sphere.position.y = sphere.userData['initialY'] + Math.sin(time * sphere.userData['floatSpeed'] + index * 2) * 2;
      sphere.position.x = sphere.userData['initialX'] + Math.cos(time * 0.4 + index * 2) * 1.5;
      sphere.rotation.x += sphere.userData['speedRotation'];
      sphere.rotation.y += sphere.userData['speedRotation'] * 0.8;
      
      // Gentle parallax effect
      const parallaxFactor = (index + 1) * 0.0005;
      sphere.position.z = sphere.userData['initialZ'] - (scrollY * parallaxFactor);
    });

    // Smooth camera movement
    this.camera.position.y = 5 - scrollY * 0.002;
    this.camera.lookAt(0, -scrollY * 0.0005, 0);

    this.renderer.render(this.scene, this.camera);
  }
}