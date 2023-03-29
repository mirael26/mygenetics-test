import { useState } from "react";
import { DiscountType, DiscountTypeRadio } from "../../consts";
import { IChangeFormDataParams, TDiscountType } from "../../types";
import Radio from "../mixins/radio/radio";
import TextInput from "../mixins/text-input/text-input";

const DiscountTypeSign = {
  percent: "%",
  fixed: "руб.",
};

interface IDiscountAmountProps {
  changeFormData?: (params: IChangeFormDataParams) => void;
}

const DiscountAmount = ({changeFormData}: IDiscountAmountProps) => {
  const [discountType, setDiscountType] = useState<TDiscountType>(
    DiscountType.Percent
  );

  const handleRadioChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountType(evt.target.value as TDiscountType);
    if (changeFormData) {
      changeFormData({
        name: 'discount-type',
        value: evt.target.value,
      });
    }
  };

  return (
    <div className="discount-amount">
      <div className="discount-amount__header">
        <p className="discount-amount__label">Размер скидки</p>
        <Radio
          values={DiscountTypeRadio}
          onRadioChange={handleRadioChange}
          checked={discountType}
        />
      </div>
      <TextInput
        type="number"
        name="discount-amount"
        required
        sign={DiscountTypeSign[discountType]}
        changeFormData={changeFormData}
      />
    </div>
  );
};

export default DiscountAmount;
