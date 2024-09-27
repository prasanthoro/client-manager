export const checkAllowedValidText = (value: any) => {
  const inputValue = value;
  const regex = /\w+/;
  if (regex.test(inputValue)) {
    return true;
  }
};
export const formatInvoiceDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
