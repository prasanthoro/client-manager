export const changeFirstCharToCap = (string: string) => {
  let data = string?.split(" ");
  return data
    ?.map((item: string) => `${item[0]?.toUpperCase() + item?.slice(1)}`)
    ?.join(" ");
};
