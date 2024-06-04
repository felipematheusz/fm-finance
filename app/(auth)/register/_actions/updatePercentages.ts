import db from '@/lib/db'

export const updatePercentages = async (userId: string, expenseType: 'fixed' | 'variable' | 'investments' | 'goals') => {
  if (expenseType === 'fixed') {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        FixedExpenses: {
          include: { FixedExpense: true }
        }, Percentages: true
      }
    });

    if (user && user.FixedExpenses && user.Percentages) {
      const totalValue = user.FixedExpenses.FixedExpense.reduce((total, expense) => total + expense.value, 0);
      const targetPercentageValue = (user.Percentages.salary * (user.Percentages.fixedExpensesPercentage / 100));
      const targetPercentageMonthValue = ((totalValue / targetPercentageValue) * 100);
      await db.fixedExpenses.update({
        where: { id: user.FixedExpenses.id },
        data: {
          targetPercentage: user.Percentages.fixedExpensesPercentage,
          targetPercentageValue,
          targetPercentageMonthValue,
          totalValue
        },
      });
    }
  } else if (expenseType === 'variable') {

    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        VariableExpenses: {
          include: { VariableExpense: true }
        }, Percentages: true
      }
    });

    if (user && user.VariableExpenses && user.Percentages) {
      const totalValue = user.VariableExpenses.VariableExpense.reduce((total, expense) => total + expense.value, 0);
      const targetPercentageValue = (user.Percentages.salary * (user.Percentages.variableExpensesPercentage / 100));
      const targetPercentageMonthValue = ((totalValue / targetPercentageValue) * 100);
      await db.variableExpenses.update({
        where: { id: user.VariableExpenses.id },
        data: {
          targetPercentage: user.Percentages.variableExpensesPercentage,
          targetPercentageValue,
          targetPercentageMonthValue,
          totalValue
        },
      });
    }
  } else if (expenseType === 'investments') {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        Investments: {
          include: { Investment: true }
        }, Percentages: true
      }
    });

    if (user && user.Investments && user.Percentages) {
      const totalValue = user.Investments.Investment.reduce((total, expense) => total + expense.value, 0);
      const targetPercentageValue = (user.Percentages.salary * (user.Percentages.investmentsPercentage / 100));
      const targetPercentageMonthValue = ((totalValue / targetPercentageValue) * 100);
      await db.investments.update({
        where: { id: user.Investments.id },
        data: {
          targetPercentage: user.Percentages.investmentsPercentage,
          targetPercentageValue,
          targetPercentageMonthValue,
          totalValue
        },
      });
    }
  } else if (expenseType === 'goals') {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        Goals: {
          include: { Goal: true }
        }, Percentages: true
      }
    });

    if (user && user.Goals && user.Percentages) {
      const totalValue = user.Goals.Goal.reduce((total, expense) => total + expense.value, 0);
      const targetPercentageValue = (user.Percentages.salary * (user.Percentages.goalsPercentage / 100));
      const targetPercentageMonthValue = ((totalValue / targetPercentageValue) * 100);
      await db.goals.update({
        where: { id: user.Goals.id },
        data: {
          targetPercentage: user.Percentages.goalsPercentage,
          targetPercentageValue,
          targetPercentageMonthValue,
          totalValue
        },
      });
    }
  }
};

