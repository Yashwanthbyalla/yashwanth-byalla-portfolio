import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="skills-section">
      <div class="container">
        <div class="section-header" [@fadeInUp]="'in'">
          <h2 class="section-title gradient-text">Tech Stack</h2>
          <div class="section-line"></div>
          <p class="section-subtitle">Technologies I work with</p>
        </div>

        <div class="skills-container">
          <div class="skills-grid" [@staggerIn]="'in'">
            <div class="skill-card" 
                 *ngFor="let skill of skills; let i = index"
                 [@skillCard]="{ value: 'in', params: { delay: (i * 100) + 'ms' } }"
                 (mouseenter)="onSkillHover(skill, i)"
                 (mouseleave)="onSkillLeave(skill, i)"
                 [style.--hue]="skill.hue">
              
              <div class="skill-icon">
                <i [class]="skill.icon" [style.color]="skill.color"></i>
              </div>
              
              <div class="skill-content">
                <h3 class="skill-name">{{ skill.name }}</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" 
                         [style.width.%]="skill.animatedLevel"
                         [style.background]="skill.gradient">
                    </div>
                  </div>
                  <span class="skill-percentage">{{ skill.level }}%</span>
                </div>
              </div>
              
              <div class="skill-glow"></div>
              <div class="skill-particles">
                <div class="particle" *ngFor="let p of skill.particles"></div>
              </div>
            </div>
          </div>

          <div class="skills-visualization" [@fadeInUp]="{ value: 'in', params: { delay: '800ms' } }">
            <div class="skill-orbit-container" #orbitContainer>
              <!-- Brain Shape Background -->
              <div class="brain-background">
                <svg class="brain-svg" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                  <!-- Main brain outline (sagittal view) -->
                  <path class="brain-outline" d="M 70 140
                    C 65 110, 75 80, 100 60
                    C 130 40, 170 35, 210 40
                    C 250 45, 285 60, 310 85
                    C 325 105, 330 125, 325 145
                    C 320 165, 310 180, 295 190
                    C 280 200, 260 205, 240 208
                    C 220 210, 200 212, 180 214
                    C 160 216, 140 218, 120 220
                    C 100 222, 85 215, 75 200
                    C 68 185, 65 165, 70 140 Z"
                    fill="rgba(255, 182, 193, 0.15)"
                    stroke="rgba(255, 105, 180, 0.6)"
                    stroke-width="2"/>
                  
                  <!-- Cerebellum -->
                  <ellipse cx="110" cy="210" rx="40" ry="25"
                    fill="rgba(255, 182, 193, 0.12)"
                    stroke="rgba(255, 105, 180, 0.5)"
                    stroke-width="1.5"/>
                  
                  <!-- Brain stem -->
                  <path d="M 130 225 Q 135 245 140 265"
                    stroke="rgba(255, 105, 180, 0.5)"
                    stroke-width="4"
                    fill="none"/>
                  
                  <!-- Corpus callosum (internal structure) -->
                  <path d="M 140 120 Q 180 115 220 120"
                    stroke="rgba(255, 105, 180, 0.4)"
                    stroke-width="2"
                    fill="none"/>
                  
                  <!-- Detailed brain folds (gyri and sulci) -->
                  <path d="M 110 70 Q 150 65 190 70" stroke="rgba(255, 105, 180, 0.5)" stroke-width="1.2" fill="none"/>
                  <path d="M 105 90 Q 145 85 185 90" stroke="rgba(255, 105, 180, 0.5)" stroke-width="1.2" fill="none"/>
                  <path d="M 100 110 Q 140 105 180 110" stroke="rgba(255, 105, 180, 0.5)" stroke-width="1.2" fill="none"/>
                  <path d="M 110 130 Q 150 125 190 130" stroke="rgba(255, 105, 180, 0.5)" stroke-width="1.2" fill="none"/>
                  <path d="M 115 150 Q 155 145 195 150" stroke="rgba(255, 105, 180, 0.5)" stroke-width="1.2" fill="none"/>
                  <path d="M 120 170 Q 160 165 200 170" stroke="rgba(255, 105, 180, 0.5)" stroke-width="1.2" fill="none"/>
                  <path d="M 125 190 Q 165 185 205 190" stroke="rgba(255, 105, 180, 0.5)" stroke-width="1.2" fill="none"/>
                  
                  <!-- Frontal lobe details -->
                  <path d="M 240 75 Q 270 70 300 75" stroke="rgba(255, 105, 180, 0.5)" stroke-width="1.2" fill="none"/>
                  <path d="M 250 95 Q 280 90 310 95" stroke="rgba(255, 105, 180, 0.5)" stroke-width="1.2" fill="none"/>
                  <path d="M 245 115 Q 275 110 305 115" stroke="rgba(255, 105, 180, 0.5)" stroke-width="1.2" fill="none"/>
                  
                  <!-- Temporal lobe -->
                  <path d="M 200 180 Q 230 175 260 180" stroke="rgba(255, 105, 180, 0.5)" stroke-width="1.2" fill="none"/>
                  
                  <!-- Occipital lobe (back) -->
                  <path d="M 85 120 Q 95 130 105 140" stroke="rgba(255, 105, 180, 0.5)" stroke-width="1.2" fill="none"/>
                  <path d="M 80 140 Q 90 150 100 160" stroke="rgba(255, 105, 180, 0.5)" stroke-width="1.2" fill="none"/>
                </svg>
                
                <div class="neural-network">
                  <div class="neuron" *ngFor="let n of neurons; let i = index" 
                       [style.left.%]="n.x" 
                       [style.top.%]="n.y"
                       [style.animation-delay]="n.delay + 's'">
                  </div>
                </div>
              </div>
              
              <div class="central-hub">
                <div class="hub-core">
                  <span class="hub-text">YB</span>
                </div>
              </div>
              
              <div class="skill-orbit" 
                   *ngFor="let orbit of skillOrbits; let i = index"
                   [style.--orbit-size]="orbit.size + 'px'"
                   [style.--orbit-duration]="orbit.duration + 's'"
                   [style.animation-delay]="orbit.delay + 's'">
                <div class="orbit-skill" 
                     [style.background]="orbit.gradient"
                     [title]="orbit.name">
                  <i [class]="orbit.icon"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="skills-summary" [@fadeInUp]="{ value: 'in', params: { delay: '200ms' } }">
          <div class="summary-card glass-effect">
            <h3>Continuous Learning</h3>
            <p>
              I'm passionate about staying current with security best practices and enterprise-level development. 
              Currently focusing on advanced security implementations, scalable architecture patterns and performance optimization techniques.
            </p>
            <div class="learning-tags">
              <span class="tag" *ngFor="let tag of learningTags">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./skills.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('{{ delay }} 600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerIn', [
      transition(':enter', [
        query('.skill-card', [
          style({ opacity: 0, transform: 'translateY(50px) scale(0.8)' }),
          stagger(100, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
          ])
        ])
      ])
    ]),
    trigger('skillCard', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px) rotateX(45deg)' }),
        animate('{{ delay }} 600ms ease-out', style({ opacity: 1, transform: 'translateY(0) rotateX(0deg)' }))
      ])
    ])
  ]
})
export class SkillsComponent implements OnInit, AfterViewInit {
  @ViewChild('orbitContainer') orbitContainer!: ElementRef;

  skills = [
    {
      name: 'Angular',
      icon: 'fab fa-angular',
      color: '#dd0031',
      level: 95,
      animatedLevel: 0,
      hue: 0,
      gradient: 'linear-gradient(45deg, #dd0031, #ff4081)',
      particles: Array(6).fill(0)
    },
    {
      name: 'Node.js',
      icon: 'fab fa-node-js',
      color: '#339933',
      level: 90,
      animatedLevel: 0,
      hue: 120,
      gradient: 'linear-gradient(45deg, #339933, #4caf50)',
      particles: Array(6).fill(0)
    },
    {
      name: 'TypeScript',
      icon: 'fab fa-js-square',
      color: '#3178c6',
      level: 92,
      animatedLevel: 0,
      hue: 210,
      gradient: 'linear-gradient(45deg, #3178c6, #2196f3)',
      particles: Array(6).fill(0)
    },
    {
      name: 'AI/ML Integration',
      icon: 'fas fa-brain',
      color: '#ff6f00',
      level: 75,
      animatedLevel: 0,
      hue: 35,
      gradient: 'linear-gradient(45deg, #ff6f00, #ff9800)',
      particles: Array(6).fill(0)
    },
    {
      name: 'Tailwind CSS',
      icon: 'fas fa-wind',
      color: '#06b6d4',
      level: 90,
      animatedLevel: 0,
      hue: 190,
      gradient: 'linear-gradient(45deg, #06b6d4, #00bcd4)',
      particles: Array(6).fill(0)
    },
    {
      name: 'Angular Material',
      icon: 'fas fa-cube',
      color: '#3f51b5',
      level: 85,
      animatedLevel: 0,
      hue: 230,
      gradient: 'linear-gradient(45deg, #3f51b5, #673ab7)',
      particles: Array(6).fill(0)
    },
    {
      name: 'NX Workspace',
      icon: 'fas fa-layer-group',
      color: '#143055',
      level: 88,
      animatedLevel: 0,
      hue: 220,
      gradient: 'linear-gradient(45deg, #143055, #1976d2)',
      particles: Array(6).fill(0)
    },
    {
      name: 'SQL Database',
      icon: 'fas fa-database',
      color: '#336791',
      level: 88,
      animatedLevel: 0,
      hue: 200,
      gradient: 'linear-gradient(45deg, #336791, #607d8b)',
      particles: Array(6).fill(0)
    },
    {
      name: 'PGP Encryption',
      icon: 'fas fa-lock',
      color: '#d32f2f',
      level: 85,
      animatedLevel: 0,
      hue: 0,
      gradient: 'linear-gradient(45deg, #d32f2f, #f44336)',
      particles: Array(6).fill(0)
    },
    {
      name: 'Veracode SAST/DAST',
      icon: 'fas fa-shield-alt',
      color: '#388e3c',
      level: 80,
      animatedLevel: 0,
      hue: 120,
      gradient: 'linear-gradient(45deg, #388e3c, #4caf50)',
      particles: Array(6).fill(0)
    },
    {
      name: 'Bootstrap',
      icon: 'fab fa-bootstrap',
      color: '#7952b3',
      level: 90,
      animatedLevel: 0,
      hue: 260,
      gradient: 'linear-gradient(45deg, #7952b3, #9c27b0)',
      particles: Array(6).fill(0)
    },
    {
      name: 'HTML5 & CSS3',
      icon: 'fab fa-html5',
      color: '#e34f26',
      level: 95,
      animatedLevel: 0,
      hue: 15,
      gradient: 'linear-gradient(45deg, #e34f26, #ff5722)',
      particles: Array(6).fill(0)
    }
  ];

  skillOrbits = [
    { name: 'Angular', icon: 'fab fa-angular', size: 200, duration: 10, delay: 0, gradient: 'linear-gradient(45deg, #dd0031, #ff4081)' },
    { name: 'Node.js', icon: 'fab fa-node-js', size: 250, duration: 12, delay: 1, gradient: 'linear-gradient(45deg, #339933, #4caf50)' },
    { name: 'AI/ML Integration', icon: 'fas fa-brain', size: 300, duration: 14, delay: 2, gradient: 'linear-gradient(45deg, #ff6f00, #ff9800)' },
    { name: 'NX Workspace', icon: 'fas fa-layer-group', size: 350, duration: 16, delay: 3, gradient: 'linear-gradient(45deg, #143055, #1976d2)' },
    { name: 'PGP Security', icon: 'fas fa-lock', size: 400, duration: 18, delay: 4, gradient: 'linear-gradient(45deg, #d32f2f, #f44336)' },
    { name: 'Veracode', icon: 'fas fa-shield-alt', size: 450, duration: 20, delay: 5, gradient: 'linear-gradient(45deg, #388e3c, #4caf50)' }
  ];

  learningTags = ['AI/ML Integration', 'Machine Learning APIs', 'Secure Coding', 'Enterprise Architecture', 'Cloud Security', 'Performance Optimization'];

  neurons = [
    { x: 20, y: 30, delay: 0 },
    { x: 35, y: 25, delay: 0.5 },
    { x: 65, y: 25, delay: 1 },
    { x: 80, y: 30, delay: 1.5 },
    { x: 25, y: 50, delay: 2 },
    { x: 50, y: 45, delay: 2.5 },
    { x: 75, y: 50, delay: 3 },
    { x: 30, y: 70, delay: 3.5 },
    { x: 70, y: 70, delay: 4 }
  ];

  connections = [
    { path: 'M 80 120 Q 140 100 200 120', delay: 0 },
    { path: 'M 100 180 Q 160 160 220 180', delay: 0.5 },
    { path: 'M 120 240 Q 180 220 240 240', delay: 1 },
    { path: 'M 280 120 Q 340 100 320 180', delay: 1.5 },
    { path: 'M 300 180 Q 360 160 340 240', delay: 2 }
  ];

  ngOnInit() {
    this.animateSkillLevels();
  }

  ngAfterViewInit() {
    this.initOrbitAnimation();
  }

  private animateSkillLevels() {
    this.skills.forEach((skill, index) => {
      setTimeout(() => {
        const increment = skill.level / 60;
        const timer = setInterval(() => {
          if (skill.animatedLevel < skill.level) {
            skill.animatedLevel = Math.min(skill.animatedLevel + increment, skill.level);
          } else {
            clearInterval(timer);
            skill.animatedLevel = skill.level;
          }
        }, 50);
      }, index * 200);
    });
  }

  private initOrbitAnimation() {
    // Additional orbit animations can be added here
  }

  onSkillHover(skill: any, index: number) {
    // Create particle burst effect
    skill.particles = Array(12).fill(0);
  }

  onSkillLeave(skill: any, index: number) {
    // Reset particles
    skill.particles = Array(6).fill(0);
  }
}