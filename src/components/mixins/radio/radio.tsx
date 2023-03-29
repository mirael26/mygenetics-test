import { IDiscountTypeRadio } from "../../../types";

interface IRadioProps {
  values: Array<IDiscountTypeRadio>;
  onRadioChange?: React.ChangeEventHandler<HTMLInputElement>;
  checked?: string;
}

const Radio = ({ values, onRadioChange, checked }: IRadioProps) => {

  return (
    <div className="radio">
      {values.map((value, i) => {
        const isChecked = checked ? value.value === checked : i === 0;
        return (
          <label key={`${value.name}-${value.value}-radio`}>
            <input
              className="radio__input visually-hidden"
              type="radio"
              name={value.name}
              value={value.value}
              onChange={onRadioChange}
              checked={isChecked}
            />
            <span className="radio__label">{value.label}</span>
          </label>
        );
      })}
    </div>
  );
};

export default Radio;
