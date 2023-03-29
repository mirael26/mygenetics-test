import { useState } from "react";
import { IChangeFormDataParams } from '../../types';
import DateInput from '../mixins/date-input/date-input';

interface IProductConditionProps {
  group: string;
  changeFormData: (params: IChangeFormDataParams) => void;
  deleteCondition: (group: string, conditionType: 'sum' | 'product' | 'date') => void;
}

const DateCondition = ({ group, changeFormData, deleteCondition }: IProductConditionProps) => {
  const [isActive, setIsActive] = useState(false);

  const activeClass = isActive ? " is-active" : "";

  const handleActivateButtonClick = () => {
    if (isActive) {
      deleteCondition(group, 'date');
    }
    setIsActive((prev) => !prev);
  }

  return (
    <div className="date-condition">
      <button
        className={`button date-condition__activate-button${activeClass}`}
        type="button"
        onClick={handleActivateButtonClick}
      >
        Срок действия
      </button>

      {isActive && (
        <div className="date-condition__inputs">
          <DateInput name="date-start" label="Начало" withInclusive changeFormData={changeFormData}/>
          <DateInput name="date-end" label="Конец" withInclusive changeFormData={changeFormData}/>
        </div>
      )}
    </div>
  );
};

export default DateCondition;