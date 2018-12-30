import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../../service/navigation/navigation.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  navService : any;

  constructor(private navigationService: NavigationService) {
    this.navService = navigationService;
  }

  ngOnInit() {
  }


}
