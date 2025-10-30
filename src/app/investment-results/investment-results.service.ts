import {Injectable, signal} from "@angular/core";
import {InvestmentInput} from "../user-input/investment-input/investment-input.model";
import {InvestmentResult} from "./investment-result/investment-result.model";

@Injectable({providedIn: 'root'})
export class InvestmentResultsService {
  resultsData = signal<InvestmentResult[] | undefined>(undefined);

  calculateInvestmentResults(calcData: InvestmentInput) {
    const {initialInvestment, duration, annualInvestment, expectedReturn} = calcData;
    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    this.resultsData.set(annualData);
  }
}
