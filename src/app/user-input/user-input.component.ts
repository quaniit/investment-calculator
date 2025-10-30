import {Component, output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InvestmentInput} from "./investment-input/investment-input.model";

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
  calculate = output<InvestmentInput>();
  initialInvestment = signal('0');
  annualInvestment = signal('0');
  expectedReturn = signal('5');
  duration = signal('10');

  onSubmit() {
    this.calculate.emit({
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
