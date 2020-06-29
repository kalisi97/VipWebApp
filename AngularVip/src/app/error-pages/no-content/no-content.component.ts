import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.css']
})
export class NoContentComponent implements OnInit {
  public errorMessage: string = "Neki resursi koje zahtevate nisu pronađeni!";
  constructor() { }

  ngOnInit(): void {
  }

}
