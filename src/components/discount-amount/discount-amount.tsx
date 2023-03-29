import { useState, useEffect } from "react";
import { DiscountType, DiscountTypeRadio, DiscountTypeSign } from "../../consts";
import { IChangeFormDataParams, TDiscountType } from "../../types";
import Radio from "../mixins/radio/radio";
import TextInput from "../mixins/text-input/text-input";

interface IDiscountAmountProps {
  changeFormData: (params: IChangeFormDataParams) => void;
}

const DiscountAmount = ({ changeFormData }: IDiscountAmountProps) => {
  const [discountType, setDiscountType] = useState<TDiscountType>(
    DiscountType.Percent
  );

  useEffect(() => {
    changeFormData({
      name: "discount-type",
      value: discountType,
    });
  }, []);

  const handleRadioChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountType(evt.target.value as TDiscountType);
    changeFormData({
      name: "discount-type",
      value: evt.target.value,
    });
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
