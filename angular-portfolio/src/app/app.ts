import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ThreeBackgroundComponent } from './components/three-background/three-background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    NavigationComponent,
    ThreeBackgroundComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'Yashwanth Byalla - Portfolio';

  ngAfterViewInit() {
    setTimeout(() => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('.portfolio-container > *')
      );

      const update = () => {
        const vh = window.innerHeight;
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          // visible = top is within screen OR section spans full screen
          const isVisible = rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
          section.classList.toggle('section-visible', isVisible);
        });
      };

      window.addEventListener('scroll', update, { passive: true });
      update(); // run once on load
    }, 100);
  }
}