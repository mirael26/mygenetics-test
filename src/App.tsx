import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppUrl } from "./consts";
import DiscountsPage from "./pages/discounts-page";
import FormPage from "./pages/form-page";
import NotFoundPage from "./pages/not-found-page";
import { IDiscountInfo } from "./types";

const App = () => {
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

  return (
    <Routes>
      <Route
        path={AppUrl.Main}
        element={<Navigate replace to={AppUrl.Discounts} />}
      />
      <Route
        path={AppUrl.Discounts}
        element={<DiscountsPage discountsList={discountsList} deleteDiscount={deleteDiscount} />}
      />
      <Route path={AppUrl.Form} element={<FormPage addDiscount={addDiscount} />} />
      <Route path={AppUrl.NotFound} element={<NotFoundPage />} />
      <Route path="/*" element={<Navigate replace to={AppUrl.NotFound} />} />
    </Routes>
  );
};

export default App;
