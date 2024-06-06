export const formatCurrency = (value: string): string => {
  let numberValue = value.replace(/\D/g, "");
  if (numberValue === "") return "";
  numberValue = (parseInt(numberValue) / 100).toFixed(2);
  numberValue = numberValue.replace(".", ",");
  numberValue = numberValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return `R$ ${numberValue}`;
};
