import { IChangeFormDataParams } from '../../../types';
import Checkbox from "../checkbox/checkbox";
import TextInput from "../text-input/text-input";

interface IDateInputProps {
  label: string;
  name: string;
  withInclusive?: boolean;
  changeFormData: (params: IChangeFormDataParams) => void;
}

const DateInput = ({ label, name, withInclusive = false, changeFormData }: IDateInputProps) => {
  return (
    <div className="date-input">
      <div className="date-input__label">
        <span>{label}</span>
        {withInclusive && (
          <Checkbox label="включительно" name={`${name}-or-equal`} changeFormData={changeFormData}/>
        )}
      </div>

      <TextInput type="datetime-local" name={name} changeFormData={changeFormData}/>
    </div>
  );
};

export default DateInput;
