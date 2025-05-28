import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    gsap.from('.hero__image', {
      scale: 0,
      duration: 1.2,
      ease: 'back.out(1.7)'
    });

    gsap.from('.hero__title--1', {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });

    gsap.from('.hero__title--2', {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.6,
      ease: 'power3.out'
    });

    gsap.from('.hero__copy span', {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.9,
      ease: 'power3.out'
    });

    gsap.to('.ring--left', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'linear'
    });

    gsap.to('.ring--right', {
      rotation: -360,
      duration: 30,
      repeat: -1,
      ease: 'linear'
    });

    gsap.to('.cross-1', {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: 'linear'
    });
  }
}
