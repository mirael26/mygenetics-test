import { useState } from "react";
import { Products } from "../../consts";
import { IChangeFormDataParams } from '../../types';
import ProductSelect from "../mixins/product-select/product-select";

const options = [
  { value: 'test1', label: 'Тест 1' },
  { value: 'test2', label: 'Тест 2' },
  { value: 'test3', label: 'Тест 3' },
  { value: 'test4', label: 'Тест 4' },
  { value: 'test5', label: 'Тест 5' },
  { value: 'test6', label: 'Тест 6' },
];

interface IProductConditionProps {
  group: string;
  changeFormData: (params: IChangeFormDataParams) => void;
  deleteCondition: (group: string, conditionType: 'sum' | 'product' | 'date') => void;
}

const ProductCondition = ({ group, changeFormData, deleteCondition }: IProductConditionProps) => {
  const [isActive, setIsActive] = useState(false);

  const activeClass = isActive ? " is-active" : "";

  const handleActivateButtonClick = () => {
    if (isActive) {
      deleteCondition(group, 'product');
    }
    setIsActive((prev) => !prev);
  }

  return (
    <div className="product-condition">
      <button
        className={`button product-condition__activate-button${activeClass}`}
        type="button"
        onClick={handleActivateButtonClick}
      >
        Продукт
      </button>

      {isActive && (
        <div className="product-condition__inputs">
          <ProductSelect
            label="В корзине должны быть"
            name="products-required"
            group={group}
            selectList={options}
            changeFormData={changeFormData}
          />
          <ProductSelect
            label="В корзине не должно быть"
            name="products-not-allowed"
            group={group}
            selectList={options}
            changeFormData={changeFormData}
          />
        </div>
      )}
    </div>
  );
};

export default ProductCondition;
