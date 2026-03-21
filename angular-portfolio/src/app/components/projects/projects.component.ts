import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="projects-section">
      <div class="container">
        <div class="section-header" [@fadeInUp]="'in'">
          <h2 class="section-title gradient-text">Personal Achievements</h2>
          <div class="section-line"></div>
          <p class="section-subtitle">Showcasing my creative journey</p>
        </div>

        <div class="projects-filter" [@slideInDown]="'in'">
          <button class="filter-btn" 
                  [class.active]="activeFilter === 'all'"
                  (click)="filterProjects('all')">
            All Projects
          </button>
          <button class="filter-btn" 
                  [class.active]="activeFilter === 'mobile'"
                  (click)="filterProjects('mobile')">
            Mobile Apps
          </button>
          <button class="filter-btn" 
                  [class.active]="activeFilter === 'extension'"
                  (click)="filterProjects('extension')">
            Extensions
          </button>
          <button class="filter-btn" 
                  [class.active]="activeFilter === 'theme'"
                  (click)="filterProjects('theme')">
            Themes
          </button>
          <button class="filter-btn" 
                  [class.active]="activeFilter === 'npm'"
                  (click)="filterProjects('npm')">
            NPM Libraries
          </button>
          <button class="filter-btn" 
                  [class.active]="activeFilter === 'vscode'"
                  (click)="filterProjects('vscode')">
            VS Code Extensions
          </button>
          <button class="filter-btn" 
                  [class.active]="activeFilter === 'snapchat'"
                  (click)="filterProjects('snapchat')">
            Snapchat Lenses
          </button>
          <button class="filter-btn" 
                  [class.active]="activeFilter === 'research'"
                  (click)="filterProjects('research')">
            Research
          </button>
        </div>

        <div class="projects-grid" [@staggerIn]="'in'">
          <div class="project-card" 
               *ngFor="let project of filteredProjects; let i = index"
               [@projectCard]="{ value: 'in', params: { delay: (i * 150) + 'ms' } }"
               [class.flipped]="project.isFlipped"
               (mouseenter)="onProjectHover(project)"
               (mouseleave)="onProjectLeave(project)">
            
            <div class="card-inner">
              <!-- Front of card -->
              <div class="card-front">
                <div class="project-image">
                  <img [src]="project.image" [alt]="project.title" />
                  <div class="image-overlay">
                    <div class="overlay-content">
                      <button class="view-btn" (click)="flipCard(project)">
                        <i class="fas fa-eye"></i>
                      </button>
                      <a [href]="project.liveUrl" target="_blank" class="live-btn" *ngIf="project.liveUrl">
                        <i class="fas fa-external-link-alt"></i>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div class="project-info">
                  <div class="project-category">{{ project.category }}</div>
                  <h3 class="project-title">{{ project.title }}</h3>
                  <p class="project-summary">{{ project.summary }}</p>
                  
                  <div class="project-tech">
                    <ng-container *ngFor="let tech of project.technologies.slice(0, 3); let i = index">
                      <span class="tech-tag" *ngIf="typeof tech === 'string'">{{ tech }}</span>
                      <span class="tech-tag" *ngIf="typeof tech === 'object' && tech.name">{{ tech.name }}</span>
                    </ng-container>
                    <span class="tech-more" *ngIf="project.technologies.length > 3">
                      +{{ project.technologies.length - 3 }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Back of card -->
              <div class="card-back">
                <div class="back-content">
                  <h3 class="back-title">{{ project.title }}</h3>
                  <p class="back-description">{{ project.description }}</p>
                  
                  <div class="back-features">
                    <h4>Key Features:</h4>
                    <ul>
                      <li *ngFor="let feature of project.features">{{ feature }}</li>
                    </ul>
                  </div>
                  
                  <div class="back-tech">
                    <h4>Technologies Used:</h4>
                    <div class="tech-grid">
                      <ng-container *ngFor="let tech of project.technologies">
                        <span class="tech-item" *ngIf="typeof tech === 'string'">{{ tech }}</span>
                        <ng-container *ngIf="typeof tech === 'object' && tech.name">
                          <span class="tech-item">{{ tech.name }}</span>
                          <span class="tech-item" *ngFor="let sub of tech.subcategories">{{ sub }}</span>
                        </ng-container>
                      </ng-container>
                    </div>
                  </div>
                  
                  <div class="back-actions">
                    <a [href]="project.liveUrl" target="_blank" class="action-btn primary" *ngIf="project.liveUrl">
                      <i class="fas fa-external-link-alt"></i>
                      View Live
                    </a>
                    <button class="action-btn secondary" (click)="flipCard(project)">
                      <i class="fas fa-arrow-left"></i>
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-glow"></div>
          </div>
        </div>

        <div class="projects-stats" [@fadeInUp]="{ value: 'in', params: { delay: '200ms' } }">
          <div class="stat-item">
            <div class="stat-number">{{ totalProjects }}</div>
            <div class="stat-label">Total Projects</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ mobileApps }}</div>
            <div class="stat-label">Mobile Apps</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ npmLibraries }}</div>
            <div class="stat-label">NPM Libraries</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ vscodeExtensions }}</div>
            <div class="stat-label">VS Code Extensions</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ snapchatLenses }}</div>
            <div class="stat-label">Snapchat Lenses</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ researchPapers }}</div>
            <div class="stat-label">Research Papers</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ extensions }}</div>
            <div class="stat-label">Extensions</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ themes }}</div>
            <div class="stat-label">Themes</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('{{ delay }} 600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerIn', [
      transition(':enter', [
        query('.project-card', [
          style({ opacity: 0, transform: 'translateY(50px) rotateX(45deg)' }),
          stagger(150, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0) rotateX(0deg)' }))
          ])
        ])
      ])
    ]),
    trigger('projectCard', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px) scale(0.8)' }),
        animate('{{ delay }} 600ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit {
  activeFilter = 'all';
  filteredProjects: any[] = [];

  projects = [
    {
      id: 1,
      title: 'Neon Time-Loop Runner',
      category: 'mobile',
      summary: 'Race through neon worlds, master time loops and compete with your ghost!',
      description: 'Race through a stunning neon world in this addictive 3D endless runner! Master the art of time loops as you dodge obstacles, collect coins and compete against your own ghost from previous runs.',
      image: '/assets/images/neon-time-loop-runner.png',
      liveUrl: 'https://play.google.com/store/apps/details?id=com.game.neon_time_loop_runner',
      technologies: [
        'HTML5', 'CSS3', 'JavaScript ES6+', 
        {
          name: 'Three.js',
          subcategories: [
            'Scene management',
            'Camera system (PerspectiveCamera)',
            'WebGL renderer',
            'Geometries (BoxGeometry, SphereGeometry, PlaneGeometry)',
            'Materials (MeshStandardMaterial, MeshBasicMaterial, MeshLambertMaterial)',
            'Lighting (AmbientLight, DirectionalLight, PointLight)',
            'Fog effects',
            'Shadow mapping (PCFSoftShadowMap)',
            'Tone mapping (ACESFilmicToneMapping)'
          ]
        },
        'Web Audio API', 'LocalStorage API', 'Touch Events API', 'RequestAnimationFrame API', 'WebGL'
      ],
      features: [
        'Time loop mechanics with ghost racing',
        '3D endless runner gameplay',
        'Neon visual effects and environments',
        'Coin collection system',
        'Ghost replay from previous runs'
      ],
      isFlipped: false
    },
    {
      id: 2,
      title: 'Bubble Blaster',
      category: 'mobile',
      summary: 'Hit the balls as they pop up. Track your hits, taps, missed balls and accuracy.',
      description: 'A fun and engaging game designed to challenge your reflexes and accuracy.',
      image: '/assets/images/bubble-blaster.png',
      liveUrl: 'https://play.google.com/store/apps/details?id=com.game.bubbleblaster',
      technologies: ['Apache Cordova', 'Android SDK', 'AnimeJS', 'AnimeCSS', 'Bootstrap', 'JavaScript', 'HTML5', 'CSS3'],
      features: [
        'Ball popping reflex gameplay',
        'Hit and miss tracking system',
        'Accuracy percentage calculation',
        'Tap counter and statistics',
        'Reflexes and timing challenges'
      ],
      isFlipped: false
    },
    {
      id: 3,
      title: 'Asteroid Exploder',
      category: 'mobile',
      summary: 'Colorful chain reaction game with stunning animations',
      description: 'An engaging mobile game featuring beautiful animations and chain reaction mechanics. Players create explosions to trigger cascading effects.',
      image: '/assets/images/asteroid-exploder.png',
      liveUrl: 'https://play.google.com/store/apps/details?id=com.yashu.asteroidExploder',
      technologies: ['Apache Cordova', 'Android SDK', 'AnimeJS', 'AnimeCSS', 'Bootstrap', 'JavaScript', 'HTML5', 'CSS3'],
      features: [
        'Chain reaction explosion mechanics',
        'Colorful particle effects',
        'Smooth animations with AnimeJS',
        'Responsive touch controls',
        'Score tracking system'
      ],
      isFlipped: false
    },
    {
      id: 4,
      title: 'Tricky Name Riddles',
      category: 'mobile',
      summary: 'Educational brain training game with interesting facts',
      description: 'A knowledge-based game that helps users learn new facts while training memory, accuracy and concentration through various topics.',
      image: '/assets/images/tricky-name-riddles.png',
      liveUrl: 'https://play.google.com/store/apps/details?id=com.yashu.game',
      technologies: ['Apache Cordova', 'Android SDK', 'AnimeJS', 'AnimeCSS', 'Bootstrap', 'JavaScript', 'HTML5', 'CSS3'],
      features: [
        'Multiple topic categories',
        'Memory training exercises',
        'Educational content',
        'Progress tracking',
        'Interactive UI'
      ],
      isFlipped: false
    },
    {
      id: 5,
      title: 'Mind Game – Match the Pair',
      category: 'mobile',
      summary: 'Memory enhancement game with pair matching mechanics',
      description: 'Exercise your brain and memory with this engaging pair matching game. Train your memory, accuracy and concentration.',
      image: '/assets/images/mind-game.jpg',
      liveUrl: 'https://play.google.com/store/apps/details?id=com.game.mindgame',
      technologies: ['Apache Cordova', 'Android SDK', 'AnimeJS', 'Bootstrap', 'JavaScript', 'jQuery', 'HTML5', 'CSS3'],
      features: [
        'Memory training mechanics',
        'Multiple difficulty levels',
        'Score tracking',
        'Smooth animations',
        'Responsive design'
      ],
      isFlipped: false
    },
    // NPM Libraries
    {
      id: 6,
      title: 'SEAL (Scroll Effect Animation Library)',
      category: 'npm',
      summary: 'JavaScript library for creating interactive scroll-based animations in web applications',
      description: 'Add description here',
      image: '/assets/images/seal-library.png',
      liveUrl: '',
      technologies: ['JavaScript', 'NPM'],
      features: [
        'Scroll-based animations',
        'Interactive effects',
        'Web application integration'
      ],
      isFlipped: false
    },
    {
      id: 7,
      title: 'upgrade-buddy',
      category: 'npm',
      summary: 'Node.js CLI utility for managing and upgrading project dependencies',
      description: 'Add description here',
      image: '/assets/images/upgrade-buddy.png',
      liveUrl: '',
      technologies: ['Node.js', 'CLI', 'NPM'],
      features: [
        'Dependency management',
        'Project upgrades',
        'CLI interface'
      ],
      isFlipped: false
    },
    {
      id: 8,
      title: 'structify-project',
      category: 'npm',
      summary: 'Command-line tool for visualizing and exporting project directory structures',
      description: 'Add description here',
      image: '/assets/images/structify-project.png',
      liveUrl: '',
      technologies: ['Node.js', 'CLI', 'NPM'],
      features: [
        'Directory visualization',
        'Project structure export',
        'Command-line interface'
      ],
      isFlipped: false
    },
    {
      id: 9,
      title: 'branchname-validator',
      category: 'npm',
      summary: 'Git utility for enforcing standardized branch naming conventions',
      description: 'Add description here',
      image: '/assets/images/branchname-validator.png',
      liveUrl: '',
      technologies: ['Git', 'Node.js', 'NPM'],
      features: [
        'Branch naming validation',
        'Git integration',
        'Standardized conventions'
      ],
      isFlipped: false
    },
    {
      id: 10,
      title: 'js-handykit',
      category: 'npm',
      summary: 'JavaScript utility toolkit providing reusable helper functions (in progress)',
      description: 'Add description here',
      image: '/assets/images/js-handykit.png',
      liveUrl: '',
      technologies: ['JavaScript', 'NPM'],
      features: [
        'Utility functions',
        'Reusable helpers',
        'JavaScript toolkit'
      ],
      isFlipped: false
    },
    // VS Code Extensions
    {
      id: 11,
      title: 'Misty Blue',
      category: 'vscode',
      summary: 'VS Code theme extension providing a clean blue-toned developer interface',
      description: 'Add description here',
      image: '/assets/images/misty-blue-ext.png',
      liveUrl: '',
      technologies: ['VS Code API', 'TypeScript', 'JSON'],
      features: [
        'Blue-toned interface',
        'Clean design',
        'Developer-friendly'
      ],
      isFlipped: false
    },
    {
      id: 12,
      title: 'Snippet Sparks',
      category: 'vscode',
      summary: 'VS Code extension for managing and inserting reusable code snippets',
      description: 'Add description here',
      image: '/assets/images/snippet-sparks.png',
      liveUrl: '',
      technologies: ['VS Code API', 'TypeScript', 'JSON'],
      features: [
        'Code snippet management',
        'Reusable snippets',
        'Quick insertion'
      ],
      isFlipped: false
    },
    {
      id: 13,
      title: 'Script Whiz',
      category: 'vscode',
      summary: 'CLI-based VS Code extension providing quick access to developer utilities',
      description: 'Add description here',
      image: '/assets/images/script-whiz.png',
      liveUrl: '',
      technologies: ['VS Code API', 'TypeScript', 'CLI'],
      features: [
        'Developer utilities',
        'CLI integration',
        'Quick access'
      ],
      isFlipped: false
    },
    {
      id: 14,
      title: 'Sync Buddy',
      category: 'vscode',
      summary: 'VS Code extension for synchronizing workspace configurations and project settings',
      description: 'Add description here',
      image: '/assets/images/sync-buddy.png',
      liveUrl: '',
      technologies: ['VS Code API', 'TypeScript', 'JSON'],
      features: [
        'Workspace synchronization',
        'Configuration management',
        'Project settings'
      ],
      isFlipped: false
    },
    {
      id: 15,
      title: 'ngBoostY',
      category: 'vscode',
      summary: 'VS Code extension providing productivity utilities for Angular development',
      description: 'Add description here',
      image: '/assets/images/ngboosty.png',
      liveUrl: '',
      technologies: ['VS Code API', 'TypeScript', 'Angular'],
      features: [
        'Angular productivity',
        'Development utilities',
        'Code generation'
      ],
      isFlipped: false
    },
    {
      id: 16,
      title: 'Log Master',
      category: 'vscode',
      summary: 'VS Code extension for managing and analyzing debugging logs during development',
      description: 'Add description here',
      image: '/assets/images/log-master.png',
      liveUrl: '',
      technologies: ['VS Code API', 'TypeScript', 'Logging'],
      features: [
        'Log management',
        'Debug analysis',
        'Development tools'
      ],
      isFlipped: false
    },
    {
      id: 17,
      title: 'Branch Name Validator',
      category: 'vscode',
      summary: 'VS Code extension for validating Git branch naming conventions',
      description: 'Add description here',
      image: '/assets/images/branch-validator-ext.png',
      liveUrl: '',
      technologies: ['VS Code API', 'TypeScript', 'Git'],
      features: [
        'Branch name validation',
        'Git integration',
        'Naming conventions'
      ],
      isFlipped: false
    },
    // Snapchat Lenses
    {
      id: 18,
      title: 'FunkyFacial Fiasco',
      category: 'snapchat',
      summary: '2.1M+ views',
      description: 'Add description here',
      image: '/assets/images/funkyfacial-fiasco.png',
      liveUrl: '',
      technologies: ['Lens Studio', 'JavaScript', 'AR'],
      features: [
        'Facial effects',
        'AR experience',
        '2.1M+ views'
      ],
      isFlipped: false
    },
    {
      id: 19,
      title: 'TimeTale Insight',
      category: 'snapchat',
      summary: 'Interactive Snapchat lens experience',
      description: 'Add description here',
      image: '/assets/images/timetale-insight.png',
      liveUrl: '',
      technologies: ['Lens Studio', 'JavaScript', 'AR'],
      features: [
        'Interactive experience',
        'AR effects',
        'User engagement'
      ],
      isFlipped: false
    },
    {
      id: 20,
      title: 'Charm Magic Studio',
      category: 'snapchat',
      summary: 'Creative AR lens with magical effects',
      description: 'Add description here',
      image: '/assets/images/charm-magic-studio.png',
      liveUrl: '',
      technologies: ['Lens Studio', 'JavaScript', 'AR'],
      features: [
        'Magical effects',
        'Creative AR',
        'Studio quality'
      ],
      isFlipped: false
    },
    // Research Publications
    {
      id: 21,
      title: 'Editing Captured Key Framed Animation Based on Motion Warping',
      category: 'research',
      summary: 'International Conference on Computer Engineering (ICCECE), 2014',
      description: 'Add description here',
      image: '/assets/images/motion-warping.png',
      liveUrl: '',
      technologies: ['Computer Graphics', 'Animation', 'Motion Capture'],
      features: [
        'Key frame animation',
        'Motion warping',
        'Computer engineering'
      ],
      isFlipped: false
    },
    {
      id: 22,
      title: 'Security for Java Applets',
      category: 'research',
      summary: 'International Journal of Research in Information Technology and Computer Communications (IJRITCC), 2014',
      description: 'Add description here',
      image: '/assets/images/java-security.png',
      liveUrl: '',
      technologies: ['Java', 'Security', 'Applets'],
      features: [
        'Java applet security',
        'Information technology',
        'Computer communications'
      ],
      isFlipped: false
    },
    {
      id: 23,
      title: 'Click the Balls',
      category: 'research',
      summary: 'International Journal of Innovative Science, Engineering & Technology (IJISET), 2014',
      description: 'Add description here',
      image: '/assets/images/click-balls.png',
      liveUrl: '',
      technologies: ['Game Development', 'Interactive Systems'],
      features: [
        'Interactive gaming',
        'Innovative technology',
        'User interaction'
      ],
      isFlipped: false
    },
    {
      id: 24,
      title: 'Rapid Ball',
      category: 'research',
      summary: 'International Journal of Innovative Engineering & Technology (IJIET), 2015',
      description: 'Add description here',
      image: '/assets/images/rapid-ball.png',
      liveUrl: '',
      technologies: ['Game Development', 'Engineering'],
      features: [
        'Rapid gameplay',
        'Innovative engineering',
        'Technology research'
      ],
      isFlipped: false
    },
    // Extensions
    {
      id: 25,
      title: 'Reminder Extension',
      category: 'extension',
      summary: 'Chrome extension for schedule management and reminders',
      description: 'A productivity extension that helps users stay on track with customizable reminders and notifications.',
      image: '/assets/images/Reminder.png',
      liveUrl: 'https://chrome.google.com/webstore/detail/reminder/nogmhgbigpdcamnpfnjfblapggbafbkd',
      technologies: ['AnimeCSS', 'Bootstrap', 'JavaScript', 'jQuery', 'Moment.js', 'HTML5', 'CSS3'],
      features: [
        'Customizable reminder intervals',
        'Desktop notifications',
        'Schedule management',
        'User-friendly interface',
        'Data persistence'
      ],
      isFlipped: false
    },
    // Themes
    {
      id: 26,
      title: 'Traverse Theme',
      category: 'theme',
      summary: 'Beautiful Chrome theme with ocean traverse imagery',
      description: 'A stunning Chrome theme featuring a traverse with umbrella over the ocean, providing a refreshing browsing experience.',
      image: '/assets/images/traverse-theme.png',
      liveUrl: 'https://chrome.google.com/webstore/detail/traverse-theme/pogihmaiohhpdepikoheaibdjjhpcfgk',
      technologies: ['Chrome Theme API', 'Image Design', 'Color Theory'],
      features: [
        'High-quality imagery',
        'Matching tab colors',
        'Ocean theme design',
        'Browser integration',
        'Visual enhancement'
      ],
      isFlipped: false
    },
    {
      id: 27,
      title: 'Misty Blue VS Code Theme',
      category: 'theme',
      summary: 'Cool dark theme for VS Code with user-friendly colors',
      description: 'A carefully crafted dark theme for Visual Studio Code that provides excellent readability and reduces eye strain.',
      image: '/assets/images/misty-blue.png',
      liveUrl: 'https://marketplace.visualstudio.com/items?itemName=d33f2gmbrsg2mlf32hg27to6utjbqm52vmxqbxml6x25odnimcoq.MistyBlue',
      technologies: ['VS Code Theme API', 'JSON', 'Color Design'],
      features: [
        'Dark theme design',
        'Syntax highlighting',
        'Eye-friendly colors',
        'Code readability',
        'Developer experience'
      ],
      isFlipped: false
    }
  ];

  totalProjects = 0;
  mobileApps = 0;
  extensions = 0;
  themes = 0;
  npmLibraries = 0;
  vscodeExtensions = 0;
  snapchatLenses = 0;
  researchPapers = 0;

  ngOnInit() {
    this.filteredProjects = [...this.projects];
    this.calculateStats();
  }

  filterProjects(category: string) {
    this.activeFilter = category;
    
    if (category === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project => project.category === category);
    }
  }

  flipCard(project: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    project.isFlipped = !project.isFlipped;
  }

  onProjectHover(project: any) {
    // Add hover effects
  }

  onProjectLeave(project: any) {
    // Remove hover effects
  }

  private calculateStats() {
    this.totalProjects = this.projects.length;
    this.mobileApps = this.projects.filter(p => p.category === 'mobile').length;
    this.extensions = this.projects.filter(p => p.category === 'extension').length;
    this.themes = this.projects.filter(p => p.category === 'theme').length;
    this.npmLibraries = this.projects.filter(p => p.category === 'npm').length;
    this.vscodeExtensions = this.projects.filter(p => p.category === 'vscode').length;
    this.snapchatLenses = this.projects.filter(p => p.category === 'snapchat').length;
    this.researchPapers = this.projects.filter(p => p.category === 'research').length;
  }
}