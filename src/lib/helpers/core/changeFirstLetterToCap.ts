export const changeFirstCharToCap = (string: string) => {
  let data = string?.split(" ");
  return data
    ?.map((item: string) => `${item[0]?.toUpperCase() + item?.slice(1)}`)
    ?.join(" ");
};

export const changeOnlyFirstLetterToCap = (string: string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const checkPhoneNumber = (event: any) => {
  const value = event.target.value.replace(/\D/g, "");
  event.target.value = value.slice(0, 10);
};
export const changeInputFormats = (string: string) => {
  let data = string?.split(/(,|\s+)/);

  return data
    ?.map((item: string) => {
      if (item && item.trim() !== "") {
        if (item.includes(",")) {
          return item;
        }
        return `${item[0].toUpperCase()}${item.slice(1).toLowerCase()}`;
      }
      return item;
    })
    ?.join("")
    .replace(/(\s+,|\s+,)/g, ", ");
};
