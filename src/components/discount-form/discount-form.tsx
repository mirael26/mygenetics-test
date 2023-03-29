import { useState } from "react";
import { ConditionFields } from "../../consts";
import { IChangeFormDataParams } from "../../types";
import { clearEmptyFields, isEmptyCondition, validateForm } from "../../utils";
import DiscountAmount from "../discount-amount/discount-amount";
import DiscountConditions from "../discount-conditions/discount-conditions";
import TextInput from "../mixins/text-input/text-input";
import Textarea from "../mixins/textarea/textarea";

const DiscountForm = () => {
  const [conditionsCount, setConditionsCount] = useState(1);
  const [formData, setFormData] = useState<{ [key: string]: string | object }>(
    {}
  );
  const [errors, setErrors] = useState<Array<string>>([]);

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formattedData = clearEmptyFields(formData);
    console.log(formattedData);
    const errors = validateForm(formattedData);

    if (errors.length) {
      setErrors(errors);
    }
  };

  const changeFormData = ({ name, value, group }: IChangeFormDataParams) => {
    const groupExist = group && typeof formData[group] === "object";
    const groupNotExist = group && !(group in formData);

    if (groupExist) {
      const prevGroupData = formData[group] as object;
      const newGroupData = { ...prevGroupData, [name]: value };

      if (isEmptyCondition(newGroupData)) {
        const newFormData = JSON.parse(JSON.stringify(formData));
        delete newFormData[group];
        setFormData(newFormData);
      } else {
        setFormData({
          ...formData,
          [group]: { ...prevGroupData, [name]: value },
        });
      }
    } else if (groupNotExist) {
      setFormData({ ...formData, [group]: { [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const deleteCondition = (
    group: string,
    conditionType: "sum" | "product" | "date"
  ) => {
    const groupExist = group && typeof formData[group] === "object";

    if (groupExist) {
      const groupData = JSON.parse(JSON.stringify(formData[group]));
      ConditionFields[conditionType].forEach(
        (field) => delete groupData[field]
      );

      if (!Object.keys(groupData).length || isEmptyCondition(groupData)) {
        const newFormData = JSON.parse(JSON.stringify(formData));
        delete newFormData[group];
        setFormData(newFormData);
      }

      setFormData({ ...formData, [group]: groupData });
    }
  };

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
