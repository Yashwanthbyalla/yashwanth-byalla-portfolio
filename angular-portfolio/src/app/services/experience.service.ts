import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  experiences = [
    {
      company: 'EPSILON',
      position: 'Lead Developer',
      duration: '08/2021 - Present',
      description: 'Architected and implemented frontend features across multiple enterprise applications using Angular, Tailwind CSS, HTML5 and CSS3.',
      achievements: [
        'Led architecture design and end-to-end development of Angular and Node.js applications within an Nx workspace, improving scalability, maintainability and performance.',
        'Led Angular framework and dependency upgrades across applications, improving performance and reducing bundle sizes.',
        'Designed and implemented secure file encryption workflows using GPG, including documentation and developer training.',
        'Identified and resolved security vulnerabilities reported by Veracode (SAST/DAST), strengthening application security compliance.',
        'Established an Architecture Decision Record (ADR) process to document key architectural decisions, improving developer onboarding and cross-team knowledge sharing.',
        'Led development of multiple brand modules within enterprise platforms, ensuring consistent performance and on-time delivery.',
        'Implemented analytics tagging using Google Tag Manager (GTM) and Adobe Tag Manager to improve user behavior tracking.',
        'Implemented responsive UI design to ensure consistent user experience across desktop and mobile devices.'
      ],
      technologies: ['Angular', 'Node.js', 'Nx Workspace', 'TypeScript', 'Tailwind CSS', 'Bootstrap', 'Angular Material', 'HTML5', 'CSS3', 'SQL', 'PGP File Encryption', 'Veracode (SAST/DAST)', 'Google Tag Manager (GTM)', 'Adobe Tag Manager'],
      awards: [
        'Magnitude Award',
        'Automate to Innovate Award',
        'Passion Award',
        'Inclusion Award',
        'Work Together to Win Together Award',
        '1% Better Everyday'
      ]
    },
    {
      company: 'DXC Technology',
      position: 'Professional 1 Software Engineer',
      duration: '05/2020 - 08/2021',
      description: 'Worked on a tool named "Agility Platform", where users can create various cloud providers.',
      achievements: [
        'Developed User Stories for different UI screens using Angular 8, HTML5, CSS3',
        'Managed a team of developers in the expansion of the tool',
        'Implemented business logic and functional requirements'
      ],
      technologies: ['Angular v8', 'Bootstrap', 'Angular Material', 'TypeScript', 'HTML5', 'CSS3'],
      awards: []
    },
    {
      company: 'Mindtree',
      position: 'Senior Software Engineer',
      duration: '09/2019 - 05/2020',
      description: 'Worked on a tool named "Data Platform Ingestion & Recognition (DPIR)" in Hospitality industry.',
      achievements: [
        'Developed User Stories for different UI screens using Angular 8, HTML5, CSS3, Bootstrap, Angular Material',
        'Created service layer using NodeJS',
        'Implemented business logic based on functional requirements'
      ],
      technologies: ['Angular v8', 'NodeJS', 'Bootstrap', 'Angular Material', 'TypeScript', 'HTML5', 'CSS3'],
      awards: ['Hats Off Award', 'Multiple A-Team Awards']
    },
    {
      company: 'Tata Consultancy Services',
      position: 'Systems Engineer',
      duration: '06/2016 - 09/2019',
      description: 'Worked with big firms in Manufacturing & Communications industry.',
      achievements: [
        'Developed User Stories for different UI screens using Angular 4-7, Bootstrap, Angular Material',
        'Provided training to organization members on Angular, HTML5, CSS3, Bootstrap',
        'Recorded training lectures for future reference',
        'Involved in various POCs and projects including IoT, AR/VR'
      ],
      technologies: ['Angular v4-7', 'NodeJs', 'Bootstrap', 'Angular Material', 'TypeScript', 'jQuery', 'Kendo UI for Angular', 'ASP.Net', 'MVC', 'T4 Template', 'ColdFusion', 'HTML5', 'CSS3', 'ReactJs'],
      awards: []
    }
  ];

  calculateTotalYears(): number {
    let totalMonths = 0;
    for (const exp of this.experiences) {
      const [startStr, endStr] = exp.duration.split(' - ');
      const [startMonth, startYear] = startStr.trim().split('/').map(Number);
      const end = endStr.trim() === 'Present' ? new Date() : new Date(+endStr.trim().split('/')[1], +endStr.trim().split('/')[0] - 1);
      const start = new Date(startYear, startMonth - 1);
      totalMonths += (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    }
    return Math.floor(totalMonths / 12);
  }
}
