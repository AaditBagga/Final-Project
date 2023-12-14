import { calculateTotalBudget } from './budgetService';

describe('Budget Service', () => {
  test('should correctly calculate the total budget', () => {
    const budgets = [{ amount: 100 }, { amount: 200 }, { amount: 300 }];
    expect(calculateTotalBudget(budgets)).toBe(600);
  });
});