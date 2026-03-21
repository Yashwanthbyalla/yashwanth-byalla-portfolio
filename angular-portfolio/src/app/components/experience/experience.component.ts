import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';
import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="experience-section">
      <div class="container">
        <div class="section-header" [@fadeInUp]>
          <h2 class="section-title gradient-text">Work Experience</h2>
          <div class="section-line"></div>
          <p class="section-subtitle">My professional journey</p>
        </div>

        <div class="timeline-container">
          <div class="timeline-line"></div>
          
          <div class="experience-item" 
               *ngFor="let exp of experiences; let i = index"
               [@slideInAlternate]="{ value: 'in', params: { delay: (i * 200), translateX: i % 2 === 0 ? '-100px' : '100px' } }"
               [class.left]="i % 2 === 0"
               [class.right]="i % 2 !== 0">
            
            <div class="timeline-dot">
              <div class="dot-inner"></div>
              <div class="dot-pulse"></div>
            </div>
            
            <div class="experience-card glass-effect" (click)="openPopup(exp)">
              <div class="card-header">
                <div class="company-info">
                  <h3 class="company-name">{{ exp.company }}</h3>
                  <h4 class="position">{{ exp.position }}</h4>
                </div>
                <div class="duration">{{ exp.duration }}</div>
              </div>
              <p class="description">{{ exp.description }}</p>
              <span class="view-details">Click to view details →</span>
            </div>
          </div>
        </div>

        <div class="experience-summary" [@fadeInUp]>
          <div class="summary-stats">
            <div class="stat-card">
              <div class="stat-icon">💼</div>
              <div class="stat-value">{{ totalYears }}+</div>
              <div class="stat-label">Years Experience</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🏢</div>
              <div class="stat-value">{{ totalCompanies }}</div>
              <div class="stat-label">Companies</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🚀</div>
              <div class="stat-value">{{ totalProjects }}+</div>
              <div class="stat-label">Projects</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🏆</div>
              <div class="stat-value">{{ totalAwards }}+</div>
              <div class="stat-label">Awards</div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- Popup Modal (outside section to avoid stacking context issues) -->
    <div class="popup-overlay" *ngIf="selectedExp" (click)="closePopup()">
      <div class="popup-content" (click)="$event.stopPropagation()">
        <button class="popup-close" (click)="closePopup()"><i class="fas fa-times"></i></button>
        
        <div class="popup-header">
          <div class="company-info">
            <h3 class="company-name">{{ selectedExp.company }}</h3>
            <h4 class="position">{{ selectedExp.position }}</h4>
          </div>
          <div class="duration">{{ selectedExp.duration }}</div>
        </div>

        <p class="description">{{ selectedExp.description }}</p>

        <ul class="achievements">
          <li *ngFor="let achievement of selectedExp.achievements">{{ achievement }}</li>
        </ul>

        <div class="technologies">
          <span class="tech-badge" 
                *ngFor="let tech of selectedExp.technologies"
                [style.--tech-color]="getTechColor(tech)">
            <i [class]="getTechIcon(tech)" *ngIf="getTechIcon(tech)"></i>
            {{ tech }}
          </span>
        </div>

        <div class="awards" *ngIf="selectedExp.awards && selectedExp.awards.length > 0">
          <h5>Awards & Recognition:</h5>
          <div class="award-list">
            <span class="award-item" *ngFor="let award of selectedExp.awards">
              🏆 {{ award }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./experience.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInAlternate', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX({{ translateX }}) translateY(50px)' }),
        animate('{{ delay }}ms 800ms ease-out', style({ opacity: 1, transform: 'translateX(0) translateY(0)' }))
      ], { params: { delay: 0, translateX: '-100px' } })
    ])
  ]
})
export class ExperienceComponent implements OnInit {
  totalYears = 0;
  totalCompanies = 0;
  totalProjects = 50;
  totalAwards = 0;

  get experiences() { return this.expService.experiences; }

  constructor(private expService: ExperienceService) {}

  selectedExp: any = null;

  ngOnInit() {
    this.totalYears = this.expService.calculateTotalYears();
    this.totalCompanies = this.experiences.length;
    this.totalAwards = this.experiences.reduce((sum, exp) => sum + (exp.awards?.length || 0), 0);
  }

  openPopup(exp: any) {
    this.selectedExp = exp;
    document.body.style.overflow = 'hidden';
  }

  closePopup() {
    this.selectedExp = null;
    document.body.style.overflow = '';
  }

  getTechColor(tech: string): string {
    const colorMap: { [key: string]: string } = {
      'Angular': '#dd0031',
      'NodeJS': '#339933',
      'TypeScript': '#3178c6',
      'JavaScript': '#f7df1e',
      'HTML5': '#e34f26',
      'CSS3': '#1572b6',
      'Bootstrap': '#7952b3',
      'SQL': '#336791',
      'Git': '#f05032'
    };
    
    for (const [key, color] of Object.entries(colorMap)) {
      if (tech.toLowerCase().includes(key.toLowerCase())) {
        return color;
      }
    }
    return '#00d4ff';
  }

  getTechIcon(tech: string): string {
    const iconMap: { [key: string]: string } = {
      'Angular': 'fab fa-angular',
      'Node': 'fab fa-node-js',
      'Nx Workspace': 'fas fa-layer-group',
      'TypeScript': 'fas fa-code',
      'Tailwind': 'fas fa-wind',
      'Bootstrap': 'fab fa-bootstrap',
      'Angular Material': 'fas fa-palette',
      'HTML5': 'fab fa-html5',
      'CSS3': 'fab fa-css3-alt',
      'SQL': 'fas fa-database',
      'PGP': 'fas fa-lock',
      'Veracode': 'fas fa-shield-alt',
      'Google Tag Manager': 'fab fa-google',
      'Adobe Tag Manager': 'fas fa-tags',
      'Git': 'fab fa-git-alt',
      'ReactJs': 'fab fa-react'
    };
    
    for (const [key, icon] of Object.entries(iconMap)) {
      if (tech.toLowerCase().includes(key.toLowerCase())) {
        return icon;
      }
    }
    return '';
  }
}