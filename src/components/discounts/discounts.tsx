import { useState } from "react";
import { IDiscountInfo } from "../../types";
import DisplayedDiscount from '../displayed-discount/displayed-discount';

interface IDiscountsProps {
  discountsList: Array<IDiscountInfo>;
  deleteDiscount: (id: string) => void;
}

const Discounts = ({ discountsList, deleteDiscount }: IDiscountsProps) => {
  const [activeDiscountId, setActiveDiscoutId] = useState(0);

  return (
    <div className="discounts">
      <div className="discounts__wrapper">
        <DisplayedDiscount discountInfo={discountsList[activeDiscountId]} />
        {/* кнопки */}
      </div>
      {/* пагинация */}
    </div>
  );
};

export default Discounts;
