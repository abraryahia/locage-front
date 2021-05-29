import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input('img') img:string='';
  @Input('title') title:string='title category';
  constructor() { }

  ngOnInit() {
  }

}
