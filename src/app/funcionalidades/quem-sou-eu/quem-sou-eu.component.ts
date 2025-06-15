import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-quem-sou-eu',
  standalone: true,
  imports: [],
  templateUrl: './quem-sou-eu.component.html',
  styleUrls: ['./quem-sou-eu.component.scss']
})
export class QuemSouEuComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    gsap.utils.toArray('[data-section]').forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });
    });
  }
}
