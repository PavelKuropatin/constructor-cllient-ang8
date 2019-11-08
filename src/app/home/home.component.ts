import {Component, OnInit} from '@angular/core';
import {ObjectHttpService} from './components/services/object-http.service';
import {Diagram} from '../domain/diagram';
import ROUTES from '../config/route-constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private diagram: Diagram[];

  constructor(
    private router: Router,
    private objectHttpService: ObjectHttpService
  ) {
  }

  ngOnInit() {
    this.getStates();
  }

  goToModeling() {
    this.router.navigate([ROUTES.MODELING]);
  }

  getStates() {
    this.objectHttpService.getDiagrams().subscribe(states => this.diagram = states);
  }

}
