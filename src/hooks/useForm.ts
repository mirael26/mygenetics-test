import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppUrl, ConditionFields } from "../consts";
import { IChangeFormDataParams, IDiscountInfo } from "../types";
import { clearEmptyFields, isEmptyCondition, validateForm } from "../utils";

const useForm = (addDiscount: (info: IDiscountInfo) => void) => {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{ [key: string]: string | object }>(
    {}
  );
  const [errors, setErrors] = useState<Array<string>>([]);

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formattedData = clearEmptyFields(formData);
    formattedData['id'] = (Date.now()).toString();
    const errors = validateForm(formattedData);

    if (errors.length) {
      setErrors(errors);
    } else {
      fetchFormData(formattedData)
        .then(() => {
          addDiscount(formattedData as IDiscountInfo);
          alert("Скидка успешно добавлена!");
          navigate(AppUrl.Discounts);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const fetchFormData = (formData: { [key: string]: string | object }) => {
    return fetch("http://localhost:3000/", {
      method: "POST",
      body: JSON.stringify(formData),
    });
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

  return {changeFormData, deleteCondition, handleFormSubmit, errors};
};

export default useForm;