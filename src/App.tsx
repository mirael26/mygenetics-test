import { Navigate, Route, Routes } from "react-router-dom";
import { AppUrl } from "./consts";
import useAppState from "./hooks/useAppState";
import DiscountsPage from "./pages/discounts-page";
import FormPage from "./pages/form-page";
import NotFoundPage from "./pages/not-found-page";

const App = () => {
  const { discountsList, addDiscount, deleteDiscount } = useAppState();

  return (
    <Routes>
      <Route
        path={AppUrl.Main}
        element={<Navigate replace to={AppUrl.Discounts} />}
      />
      <Route
        path={AppUrl.Discounts}
        element={
          <DiscountsPage
            discountsList={discountsList}
            deleteDiscount={deleteDiscount}
          />
        }
      />
      <Route
        path={AppUrl.Form}
        element={<FormPage addDiscount={addDiscount} />}
      />
      <Route path={AppUrl.NotFound} element={<NotFoundPage />} />
      <Route path="/*" element={<Navigate replace to={AppUrl.NotFound} />} />
    </Routes>
  );
};

export default App;
