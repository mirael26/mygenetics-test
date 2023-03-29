import { IChangeFormDataParams } from "../../types";
import DateCondition from "../date-condition/date-condition";
import ProductCondition from "../product-condition/product-condition";
import SumCondition from "../sum-condition/sum-condition";

interface IDiscountConditionsProps {
  name: string;
  changeFormData: (params: IChangeFormDataParams) => void;
  deleteCondition: (group: string, conditionType: 'sum' | 'product' | 'date') => void;
}

const DiscountConditions = (props: IDiscountConditionsProps) => {
  const { name, changeFormData, deleteCondition } = props;

  return (
    <fieldset className="discount-conditions">
      <SumCondition changeFormData={changeFormData} deleteCondition={deleteCondition} group={name} />
      <ProductCondition changeFormData={changeFormData} deleteCondition={deleteCondition}  group={name} />
      <DateCondition changeFormData={changeFormData} deleteCondition={deleteCondition}  group={name} />
    </fieldset>
  );
};

export default DiscountConditions;
