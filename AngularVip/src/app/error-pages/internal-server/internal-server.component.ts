import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrls: ['./internal-server.component.css']
})
export class InternalServerComponent implements OnInit {
  public errorMessage: string = "Došlo je do greške prilikom obrađivanja zahteva!";
  constructor() { }

  ngOnInit(): void {
  }

}
