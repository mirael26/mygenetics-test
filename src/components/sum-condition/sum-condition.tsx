import { useState } from "react";
import { IChangeFormDataParams } from '../../types';
import SumInput from "../mixins/sum-input/sum-input";

interface ISumConditionProps {
  group: string;
  changeFormData: (params: IChangeFormDataParams) => void;
  deleteCondition: (group: string, conditionType: 'sum' | 'product' | 'date') => void;
}

const SumCondition = ({ group, changeFormData, deleteCondition }: ISumConditionProps) => {
  const [isActive, setIsActive] = useState(false);

  const activeClass = isActive ? " is-active" : "";

  const handleActivateButtonClick = () => {
    if (isActive) {
      deleteCondition(group, 'sum');
    }
    setIsActive((prev) => !prev);
  }

  return (
    <div className="sum-condition">
      <button
        className={`button sum-condition__activate-button${activeClass}`}
        type="button"
        onClick={handleActivateButtonClick}
      >
        Сумма
      </button>

      {isActive && (
        <div className="sum-condition__inputs">
          <SumInput label="Больше" name="sum-greater" group={group} withInclusive changeFormData={changeFormData}/>
          <SumInput label="Меньше" name="sum-less" group={group}  withInclusive changeFormData={changeFormData}/>
          <SumInput label="Равно" name="sum-equal" group={group} changeFormData={changeFormData} />
        </div>
      )}
    </div>
  );
};

export default SumCondition;
