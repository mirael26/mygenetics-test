import { useState } from "react";
import useForm from "../../hooks/useForm";
import { IDiscountInfo } from "../../types";
import DiscountAmount from "../discount-amount/discount-amount";
import DiscountConditions from "../discount-conditions/discount-conditions";
import TextInput from "../mixins/text-input/text-input";
import Textarea from "../mixins/textarea/textarea";

interface IDiscountFormProps {
  addDiscount: (info: IDiscountInfo) => void;
}

const DiscountForm = ({ addDiscount }: IDiscountFormProps) => {
  const [conditionsCount, setConditionsCount] = useState(1);

  const { changeFormData, deleteCondition, handleFormSubmit, errors } =
    useForm(addDiscount);

  const conditions = Array(conditionsCount)
    .fill(null)
    .map((el, i) => (
      <DiscountConditions
        key={`conditions-${i + 1}`}
        name={`conditions-${i + 1}`}
        changeFormData={changeFormData}
        deleteCondition={deleteCondition}
      />
    ));

  return (
    <div className="discount-form">
      <form className="discount-form__form" onSubmit={handleFormSubmit}>
        <TextInput
          label="Название"
          name="name"
          required
          changeFormData={changeFormData}
        />
        <Textarea
          label="Описание"
          name="description"
          changeFormData={changeFormData}
        />
        <DiscountAmount changeFormData={changeFormData} />

        <p className="discount-form__label">Условия скидки</p>

        <div className="discount-form__conditions">
          {conditions}

          <button
            type="button"
            className="button discount-form__add-conditions-button"
            onClick={() => setConditionsCount((prev) => prev + 1)}
          >
            Добавить альтернативное условие
          </button>
        </div>

        {!!errors.length &&
          errors.map((error, i) => (
            <p key={`error-${i}`} className="discount-form__error">
              {error}
            </p>
          ))}

        <button className="button discount-form__button-submit" type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default DiscountForm;
