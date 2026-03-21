import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled" [@slideIn]="'in'">
      <div class="nav-container">
        <div class="nav-logo">
          <span class="gradient-text">YB</span>
        </div>
        
        <ul class="nav-menu" [class.active]="isMenuOpen">
          <li class="nav-item" *ngFor="let item of navItems; let i = index" 
              [@fadeInUp]="{ value: 'in', params: { delay: i * 100 + 'ms' } }">
            <a [href]="item.href" class="nav-link" (click)="scrollToSection($event, item.href)">
              {{ item.label }}
            </a>
          </li>
        </ul>
        
        <div class="hamburger" [class.active]="isMenuOpen" (click)="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('600ms ease-out', style({ transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('{{ delay }} 400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class NavigationComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;

  navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  ngOnInit() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  scrollToSection(event: Event, href: string) {
    event.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      this.closeMenu();
    }
  }
}