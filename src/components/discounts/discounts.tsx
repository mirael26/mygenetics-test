import { useState } from "react";
import { Link } from "react-router-dom";
import { AppUrl } from "../../consts";
import { IDiscountInfo } from "../../types";
import DisplayedDiscount from "../displayed-discount/displayed-discount";
import Pagination from "../pagination/pagination";

interface IDiscountsProps {
  discountsList: Array<IDiscountInfo>;
  deleteDiscount: (id: string) => void;
}

const Discounts = ({ discountsList, deleteDiscount }: IDiscountsProps) => {
  const [activeDiscountId, setActiveDiscountId] = useState(0);

  return (
    <div className="discounts">
      <div className="discounts__wrapper">
        <DisplayedDiscount discountInfo={discountsList[activeDiscountId]} />
        <div className="discounts__buttons">
          <Link to={AppUrl.Form} className="button discounts__button">
            Добавить
          </Link>
          <button
            className="button discounts__button"
            onClick={() => deleteDiscount(discountsList[activeDiscountId].id)}
          >
            Удалить
          </button>
        </div>
      </div>
      {discountsList.length > 1 && (
        <div className="discounts__pagination">
          <Pagination
            activeDiscountId={activeDiscountId}
            setActiveDiscountId={setActiveDiscountId}
            discountCount={discountsList.length}
          />
        </div>
      )}
    </div>
  );
};

export default Discounts;
