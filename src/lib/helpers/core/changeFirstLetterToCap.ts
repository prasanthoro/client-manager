export const changeFirstCharToCap = (string: string) => {
  let data = string?.split(" ");
  return data
    ?.map((item: string) => `${item[0]?.toUpperCase() + item?.slice(1)}`)
    ?.join(" ");
};
export const checkPhoneNumber = (event: any) => {
  const value = event.target.value.replace(/\D/g, "");
  event.target.value = value.slice(0, 10);
};
