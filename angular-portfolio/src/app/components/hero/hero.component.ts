import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="hero-section">
      <div class="hero-container">
        <div class="hero-content" [@fadeInUp]="'in'">
          <div class="greeting" [@slideInLeft]="'in'">
            <span class="wave">👋</span>
            <span>Hi, I'm</span>
          </div>
          
          <h1 class="hero-title" [@scaleIn]="'in'">
            <span class="gradient-text">Yashwanth Byalla</span>
          </h1>
          
          <div class="typewriter-container">
            <h2 class="typewriter">
              <span class="typed-text">{{ currentText }}</span>
              <span class="cursor" [class.typing]="isTyping">|</span>
            </h2>
          </div>
          
          <p class="hero-description" [@fadeInUp]="{ value: 'in', params: { delay: '800ms' } }">
            Full-Stack Developer passionate about creating elegant, innovative solutions 
            with cutting-edge technologies and stunning user experiences.
          </p>
          
          <div class="hero-buttons" [@fadeInUp]="{ value: 'in', params: { delay: '1000ms' } }">
            <a href="#projects" class="btn btn-primary">
              <span>View My Work</span>
              <div class="btn-glow"></div>
            </a>
            <a href="#contact" class="btn btn-secondary">
              <span>Get In Touch</span>
            </a>
          </div>
        </div>
        
        <div class="floating-elements">
          <div class="floating-element" 
               *ngFor="let element of floatingElements; let i = index"
               [style.left.%]="element.x"
               [style.top.%]="element.y"
               [style.animation-delay]="element.delay + 's'">
            {{ element.icon }}
          </div>
        </div>
        
        <div class="scroll-indicator" [@bounce]="'in'">
          <div class="scroll-arrow"></div>
          <span>Scroll Down</span>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('{{ delay }} 600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),

    trigger('bounce', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('1200ms 2s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HeroComponent implements OnInit, OnDestroy {
  currentText = '';
  isTyping = false;
  private typewriterTexts = [
    'Full-Stack Developer',
    'Angular Expert',
    'Node.js Specialist',
    'UI/UX Enthusiast',
    'Problem Solver'
  ];
  private currentIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typewriterInterval: any;

  floatingElements = [
    { icon: '⚡', x: 10, y: 20, delay: 0 },
    { icon: '🚀', x: 85, y: 15, delay: 1 },
    { icon: '💡', x: 15, y: 70, delay: 2 },
    { icon: '🎯', x: 80, y: 75, delay: 3 },
    { icon: '⭐', x: 50, y: 10, delay: 4 },
    { icon: '🔥', x: 90, y: 50, delay: 5 }
  ];

  ngOnInit() {
    this.startTypewriter();
  }

  ngOnDestroy() {
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }
  }

  private startTypewriter() {
    this.typewriterInterval = setInterval(() => {
      this.typeWriter();
    }, 100);
  }

  private typeWriter() {
    const currentFullText = this.typewriterTexts[this.currentIndex];
    
    if (this.isDeleting) {
      this.currentText = currentFullText.substring(0, this.charIndex - 1);
      this.charIndex--;
      this.isTyping = true;
    } else {
      this.currentText = currentFullText.substring(0, this.charIndex + 1);
      this.charIndex++;
      this.isTyping = true;
    }

    if (!this.isDeleting && this.charIndex === currentFullText.length) {
      this.isTyping = false;
      setTimeout(() => {
        this.isDeleting = true;
      }, 2000);
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.typewriterTexts.length;
    }
  }
}