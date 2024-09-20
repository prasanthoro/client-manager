export const formatAmount = (amount: any) => {
    const formattedAmount = new Intl.NumberFormat('en-IN', { 
        style: 'currency', 
        currency: 'INR',
        maximumFractionDigits: 2 // To limit the decimal points to two
      }).format(amount);
    return formattedAmount;
  };