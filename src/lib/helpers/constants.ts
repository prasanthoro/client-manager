export const checkAllowedValidText = (value: any) => {
  const inputValue = value;
  const regex = /\w+/;
  if (regex.test(inputValue)) {
    return true;
  }
};
