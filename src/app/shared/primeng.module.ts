import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  exports: [
    InputTextModule,
    DropdownModule,
    ButtonModule,
    AccordionModule,
    FieldsetModule,
    ToolbarModule,
    ProgressSpinnerModule,
    ProgressBarModule
  ]
})
export class PrimengModule { }
