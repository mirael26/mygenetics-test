export const isEmptyCondition = (condition: {[key: string]: string}): boolean => {
  const hasAnyValue = Object.keys(condition).some((key) => condition[key].length);
  return !hasAnyValue;
};
