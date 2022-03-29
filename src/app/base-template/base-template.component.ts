import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-base-template',
  templateUrl: './base-template.component.html',
  styleUrls: ['./base-template.component.scss'],
})
export class BaseTemplateComponent implements OnInit {
  // @ts-ignore
  toolbarName: String = "Muffondor";

  constructor() {
  }



  ngOnInit(): void {}
}
