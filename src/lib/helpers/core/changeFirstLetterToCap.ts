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
export const changeInputFormats = (string: string) => {
  // Split the input string by spaces while keeping the commas
  let data = string?.split(/(,|\s+)/); // This splits by commas and spaces but keeps them in the result

  // Map through each item
  return data
    ?.map((item: string) => {
      // Capitalize the first character if the item is not empty and is not a space
      if (item && item.trim() !== "") {
        if (item.includes(",")) {
          return item; // Return commas as is
        }
        return `${item[0].toUpperCase()}${item.slice(1).toLowerCase()}`; // Capitalize first letter
      }
      return item; // Return the item as is if it's empty
    })
    ?.join("") // Join the array back into a string without adding extra spaces
    .replace(/(\s+,|\s+,)/g, ", "); // Ensure proper spacing after commas
};
