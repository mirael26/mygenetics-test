import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppUrl } from './consts';
import DiscountsPage from "./pages/discounts-page";
import FormPage from "./pages/form-page";
import NotFoundPage from "./pages/not-found-page";
import { IDiscountInfo } from "./types";

const App = () => {
  const [discountsList, setDiscountsList] = useState<Array<IDiscountInfo>>([]);

  return (
    <Routes>
      <Route
        path={AppUrl.Main}
        element={<Navigate replace to={AppUrl.Discounts} />}
      />
      <Route
        path={AppUrl.Discounts}
        element={<DiscountsPage discountsList={discountsList} />}
      />
      <Route path={AppUrl.Form} element={<FormPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
