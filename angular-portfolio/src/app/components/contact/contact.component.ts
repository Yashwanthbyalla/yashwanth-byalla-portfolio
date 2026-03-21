import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="contact-section">
      <div class="container">
        <div class="section-header" [@fadeInUp]="'in'">
          <h2 class="section-title gradient-text">Get In Touch</h2>
          <div class="section-line"></div>
          <p class="section-subtitle">Let's create something amazing together</p>
        </div>

        <div class="contact-content">
          <div class="contact-info" [@slideInLeft]="'in'">
            <div class="info-card glass-effect">
              <h3>Let's Connect</h3>
              <p>
                I'm always excited to work on new projects and collaborate with 
                talented individuals. Whether you have a project in mind or just 
                want to say hello, feel free to reach out!
              </p>

              <div class="contact-methods">
                <div class="contact-method" 
                     *ngFor="let method of contactMethods; let i = index"
                     [@fadeInUp]="{ value: 'in', params: { delay: (i * 200 + 400) + 'ms' } }">
                  <div class="method-icon">
                    <i [class]="method.icon"></i>
                  </div>
                  <div class="method-info">
                    <h4>{{ method.title }}</h4>
                    <a [href]="method.link" [target]="method.target">{{ method.value }}</a>
                  </div>
                </div>
              </div>

              <div class="social-links" [@fadeInUp]="{ value: 'in', params: { delay: '800ms' } }">
                <h4>Follow Me</h4>
                <div class="social-icons">
                  <a *ngFor="let social of socialLinks" 
                     [href]="social.url" 
                     target="_blank" 
                     class="social-icon"
                     [title]="social.name">
                    <i [class]="social.icon"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-form-container" [@slideInRight]="'in'">
            <form class="contact-form glass-effect" (ngSubmit)="onSubmit()" #contactForm="ngForm">
              <div class="form-group" [@fadeInUp]="{ value: 'in', params: { delay: '200ms' } }">
                <label for="name">Name</label>
                <input type="text" 
                       id="name" 
                       name="name" 
                       [(ngModel)]="formData.name" 
                       required 
                       class="form-input"
                       placeholder="Your Name">
                <div class="input-line"></div>
              </div>

              <div class="form-group" [@fadeInUp]="{ value: 'in', params: { delay: '400ms' } }">
                <label for="email">Email</label>
                <input type="email" 
                       id="email" 
                       name="email" 
                       [(ngModel)]="formData.email" 
                       required 
                       class="form-input"
                       placeholder="your.email@example.com">
                <div class="input-line"></div>
              </div>

              <div class="form-group" [@fadeInUp]="{ value: 'in', params: { delay: '600ms' } }">
                <label for="subject">Subject</label>
                <input type="text" 
                       id="subject" 
                       name="subject" 
                       [(ngModel)]="formData.subject" 
                       required 
                       class="form-input"
                       placeholder="Project Discussion">
                <div class="input-line"></div>
              </div>

              <div class="form-group" [@fadeInUp]="{ value: 'in', params: { delay: '800ms' } }">
                <label for="message">Message</label>
                <textarea id="message" 
                          name="message" 
                          [(ngModel)]="formData.message" 
                          required 
                          class="form-input"
                          rows="5"
                          placeholder="Tell me about your project..."></textarea>
                <div class="input-line"></div>
              </div>

              <button type="submit" 
                      class="submit-btn" 
                      [disabled]="!contactForm.form.valid || isSubmitting"
                      [@fadeInUp]="{ value: 'in', params: { delay: '1000ms' } }">
                <span *ngIf="!isSubmitting">
                  <i class="fas fa-paper-plane"></i>
                  Send Message
                </span>
                <span *ngIf="isSubmitting">
                  <i class="fas fa-spinner fa-spin"></i>
                  Sending...
                </span>
                <div class="btn-glow"></div>
              </button>
            </form>
          </div>
        </div>

        <div class="floating-contact-bar">
          <a *ngFor="let contact of quickContacts" 
             [href]="contact.link" 
             [target]="contact.target"
             class="quick-contact-btn"
             [title]="contact.title">
            <i [class]="contact.icon"></i>
          </a>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./contact.component.scss'],
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
    ])
  ]
})
export class ContactComponent implements OnInit {
  isSubmitting = false;

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  contactMethods = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'yashwanthbyalla95@gmail.com',
      link: 'mailto:yashwanthbyalla95@gmail.com',
      target: '_self'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+91-8919346754',
      link: 'tel:+91-8919346754',
      target: '_self'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      value: 'India',
      link: '#',
      target: '_self'
    }
  ];

  socialLinks = [
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin-in',
      url: 'https://www.linkedin.com/in/yashwanthbyalla/'
    },
    {
      name: 'GitHub',
      icon: 'fab fa-github',
      url: 'https://github.com/yashwanthbyalla'
    },
    {
      name: 'Twitter',
      icon: 'fab fa-twitter',
      url: '#'
    },
    {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      url: '#'
    }
  ];

  quickContacts = [
    {
      icon: 'fas fa-envelope',
      link: 'mailto:yashwanthbyalla95@gmail.com',
      target: '_self',
      title: 'Email'
    },
    {
      icon: 'fas fa-phone',
      link: 'tel:+91-8919346754',
      target: '_self',
      title: 'Phone'
    },
    {
      icon: 'fab fa-linkedin-in',
      link: 'https://www.linkedin.com/in/yashwanthbyalla/',
      target: '_blank',
      title: 'LinkedIn'
    },
    {
      icon: 'fab fa-github',
      link: 'https://github.com/yashwanthbyalla',
      target: '_blank',
      title: 'GitHub'
    }
  ];

  ngOnInit() {}

  onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', this.formData);
      alert('Thank you for your message! I will get back to you soon.');
      this.resetForm();
      this.isSubmitting = false;
    }, 2000);
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}