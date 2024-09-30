export const formatAmount = (amount: any) => {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
  return formattedAmount;
};
export const addSerial = (dataArray: any, page: any, limit: any) => {
  if (dataArray?.length) {
    let arrayAfterSerial = dataArray.map((item: any, index: number) => {
      return { ...item, serial: (page - 1) * limit + (index + 1) };
    });
    return arrayAfterSerial;
  }
  return [];
};
