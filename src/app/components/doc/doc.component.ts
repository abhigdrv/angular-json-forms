import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrl: './doc.component.scss'
})
export class DocComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events to handle hash fragment scrolling
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToFragment();
      }
    });
  }

  ngAfterViewInit(): void {
    this.scrollToFragment();
  }

  scrollToFragment() {
    const fragment = window.location.hash.substring(1); // Get the hash part without the #
    if (fragment) {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Scroll to the element
      }
    }
  }
}
