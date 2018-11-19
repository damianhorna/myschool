import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  render: boolean[] = [true, false, false, false, false, false, false];

  constructor() {
  }

  ngOnInit() {
  }

  activateScreen(screenNumber){
    for (let i = 0; i< this.render.length; i++) {
      this.render[i] = false;
    }
    this.render[screenNumber] = true;
  }
}
