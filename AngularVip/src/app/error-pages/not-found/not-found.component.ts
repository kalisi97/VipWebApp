import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  public errorMessage: string = "Neki resursi koje zahtevate nisu pronađeni!";
  constructor() { }

  ngOnInit(): void {
  }

}
