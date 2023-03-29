import { useState } from "react";
import { IDiscountInfo } from "../types";

const useAppState = () => {
  const [discountsList, setDiscountsList] = useState<Array<IDiscountInfo>>([]);

  const addDiscount = (discountData: IDiscountInfo) => {
    const newDiscountsList = [...discountsList];
    newDiscountsList.push(discountData);
    setDiscountsList(newDiscountsList);
  };

  const deleteDiscount = (id: string) => {
    const listId = discountsList.findIndex((discount) => discount.id === id);
    if (listId !== -1) {
      const newDiscountsList = [...discountsList];
      newDiscountsList.splice(listId, 1);
      setDiscountsList(newDiscountsList);
    }
  };

  return { discountsList, addDiscount, deleteDiscount };
};

export default useAppState;
