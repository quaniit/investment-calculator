import {Component, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InvestmentResultsService} from "../investment-results/investment-results.service";

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})

export class UserInputComponent {
  initialInvestment = signal('0');
  annualInvestment = signal('0');
  expectedReturn = signal('5');
  duration = signal('10');

  private investmentService = inject(InvestmentResultsService);

  onSubmit() {
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.initialInvestment(),
      duration: +this.duration(),
      annualInvestment: +this.annualInvestment(),
      expectedReturn: +this.expectedReturn()
    });

    this.initialInvestment.set('0');
    this.annualInvestment.set('0');
    this.expectedReturn.set('5');
    this.duration = signal('10');
  }
}
