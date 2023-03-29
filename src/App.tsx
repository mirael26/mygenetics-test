import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppUrl } from "./consts";
import DiscountsPage from "./pages/discounts-page";
import FormPage from "./pages/form-page";
import NotFoundPage from "./pages/not-found-page";
import { IDiscountInfo } from "./types";


const mock = {
  "discount-type": "percent",
  name: "Прекрасная скидка",
  description:"Чудесная расчудесная скидка только сейчас только для вас налетай покупай",
  "discount-amount":"10",
  "conditions-1": {
    "sum-min":"20",
    "sum-max":"200",
    "products-required": [
      {
      "value":"test2",
      "label":"Тест 2"
      },
      {
      "value":"test3",
      "label":"Тест 3"
      }
    ],
    "products-not-allowed":[
    {
    "value":"test1",
    "label":"Тест 1"
    }
    ],
    "sum-max-or-equal":"true"
    },
    "date-start":"2023-03-30T07:00",
    "date-end":"2023-03-31T01:41",
    "date-start-or-equal":"true",
  "conditions-2": {
    "sum-equal":"10000"
  },
  "id": "1680115746737"
};

const App = () => {
  const [discountsList, setDiscountsList] = useState<Array<IDiscountInfo>>([mock]);

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
