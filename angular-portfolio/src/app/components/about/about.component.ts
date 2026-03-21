import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';
import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="about-section">
      <div class="container">
        <div class="section-header" [@fadeInUp]="'in'">
          <h2 class="section-title gradient-text">About Me</h2>
          <div class="section-line"></div>
        </div>
        
        <div class="about-content">
          <div class="about-text" [@slideInLeft]="'in'">
            <div class="text-card glass-effect neon-glow">
              <h3>Hello there! 👨‍💻</h3>
              <p>
                My name is <strong>Yashwanth</strong> and I am a passionate Full-Stack Developer 
                with a love for creating innovative digital experiences. I specialize in building 
                scalable web applications using cutting-edge technologies.
              </p>
              <p>
                I enjoy spending my free time exploring new technologies, building challenging 
                projects and sharing knowledge with the developer community. My goal is to 
                create solutions that not only solve problems but also provide exceptional 
                user experiences.
              </p>
              <p>
                When I'm not coding, you'll find me experimenting with new frameworks, 
                contributing to open-source projects, or mentoring fellow developers.
              </p>
            </div>
          </div>
          
          <div class="about-stats" [@slideInRight]="'in'">
            <div class="stats-grid">
              <div class="stat-card" 
                   *ngFor="let stat of stats; let i = index"
                   [@fadeInUp]="{ value: 'in', params: { delay: (i * 200) + 'ms' } }"
                   (mouseenter)="onStatHover(i)"
                   (mouseleave)="onStatLeave(i)">
                <div class="stat-icon">{{ stat.icon }}</div>
                <div class="stat-number" [attr.data-target]="stat.number">
                  {{ formatNumber(animatedNumbers[i]) }}{{ stat.showPlus ? '+' : '' }}
                </div>
                <div class="stat-label">{{ stat.label }}</div>
                <div class="stat-glow"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="expertise-section" [@fadeInUp]="{ value: 'in', params: { delay: '800ms' } }">
          <h3 class="expertise-title">Top Expertise</h3>
          <div class="expertise-content">
            <div class="expertise-text">
              <p>
                Senior Full-Stack Developer specializing in <strong>Angular + Node.js</strong> with expertise in 
                <strong>Security Engineering, PGP File Encryption and Veracode SAST/DAST Integration</strong>. 
                I architect scalable enterprise applications using modern frameworks like <strong>NX Workspace, 
                Tailwind CSS and many others</strong> - driven by a passion for building across every layer of the stack.
              </p>
              <!-- <div class="tech-highlights">
                <span class="tech-badge">🔒 Security Expert</span>
                <span class="tech-badge">🚀 Angular</span>
                <span class="tech-badge">⚡ NX Workspace</span>
                <span class="tech-badge">🛡️ Veracode Integration</span>
              </div> -->
              <a href="/assets/1Resume_Yashwanth_Byalla1.pdf" 
                 target="_blank" 
                 class="download-btn">
                <span>📄 Download Resume</span>
                <div class="btn-ripple"></div>
              </a>
            </div>
            <div class="expertise-visual">
              <div class="code-snippet">
                <div class="code-header">
                  <div class="code-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span class="code-title">developer.ts</span>
                </div>
                <div class="code-content">
                  <div class="code-line" *ngFor="let line of codeLines; let i = index"
                       [@typewriter]="{ value: 'in', params: { delay: (i * 500) + 'ms' } }">
                    <span class="line-number">{{ i + 1 }}</span>
                    <span [innerHTML]="line"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('{{ delay }} 600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('typewriter', [
      transition(':enter', [
        style({ opacity: 0, width: '0' }),
        animate('{{ delay }} 1s ease-out', style({ opacity: 1, width: '*' }))
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {
  stats = [
    { icon: '💼', number: 0, label: 'Years Experience', current: 0, showPlus: true },
    { icon: '🚀', number: 25, label: 'Open Source Contributions', current: 0, showPlus: true },
    { icon: '🏆', number: 5, label: 'Industries served', current: 0, showPlus: false },
    { icon: '⭐', number: 15, label: 'Certifications', current: 0, showPlus: true },
    { icon: '👥', number: 4, label: 'Research Publications', current: 0, showPlus: false },
    { icon: '☕', number: 10000 , label: 'Cups of Coffee', current: 0, showPlus: true }
  ];

  animatedNumbers: number[] = [0, 0, 0, 0, 0, 0];

  constructor(private expService: ExperienceService) {}

  ngOnInit() {
    this.stats[0].number = this.expService.calculateTotalYears();
    this.animateNumbers();
  }

  codeLines = [
    '<span class="keyword">const</span> <span class="variable">developer</span> = {',
    '  <span class="property">name</span>: <span class="string">"Yashwanth Byalla"</span>,',
    '  <span class="property">role</span>: <span class="string">"Senior Full-Stack Developer"</span>,',
    '  <span class="property">frontend</span>: [<span class="string">"Angular"</span>, <span class="string">"TypeScript"</span>, <span class="string">"Tailwind CSS"</span>],',
    '  <span class="property">backend</span>: [<span class="string">"Node.js"</span>, <span class="string">"SQL"</span>],',
    '  <span class="property">security</span>: [<span class="string">"PGP Encryption"</span>, <span class="string">"Veracode SAST/DAST"</span>],',
    '  <span class="property">tools</span>: [<span class="string">"NX Workspace"</span>, <span class="string">"Angular Material"</span>],',
    '  <span class="property">passion</span>: <span class="string">"Secure & Scalable Solutions"</span>',
    '};'
  ];

  private animateNumbers() {
    this.stats.forEach((stat, index) => {
      const increment = stat.number / 50;
      const timer = setInterval(() => {
        if (this.animatedNumbers[index] < stat.number) {
          this.animatedNumbers[index] = Math.min(
            this.animatedNumbers[index] + increment,
            stat.number
          );
        } else {
          clearInterval(timer);
          this.animatedNumbers[index] = stat.number;
        }
      }, 50);
    });
  }

  formatNumber(num: number): string {
    if (num >= 1000) return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    return Math.floor(num).toString();
  }

  onStatHover(index: number) {
    // Add hover effects
  }

  onStatLeave(index: number) {
    // Remove hover effects
  }
}