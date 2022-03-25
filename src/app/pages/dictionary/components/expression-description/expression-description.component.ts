import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MetadataService } from 'src/app/shared/services/metadata.service';

@Component({
  selector: 'app-expression-description',
  templateUrl: './expression-description.component.html',
  styleUrls: ['./expression-description.component.css'],
})
export class ExpressionDescriptionComponent implements OnInit {
  @Input() expression: string;
  expressionDescription$: Observable<string>;
  constructor(private metadataService: MetadataService) {}

  ngOnInit(): void {
    this.expressionDescription$ = this.metadataService.getExpressionDescription(
      this.expression
    );
  }
}
