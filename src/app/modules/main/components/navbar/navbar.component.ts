import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showMenu = false;
  constructor() { }

  ngOnInit(): void {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(otherButton => otherButton.classList.remove('active'));
        button.classList.add('active');
      });
    });
  }


  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}
