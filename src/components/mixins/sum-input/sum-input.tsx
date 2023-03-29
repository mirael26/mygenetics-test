import { IChangeFormDataParams } from "../../../types";
import Checkbox from "../checkbox/checkbox";
import TextInput from "../text-input/text-input";

interface ISumInputProps {
  label: string;
  name: string;
  group: string;
  withInclusive?: boolean;
  changeFormData: (params: IChangeFormDataParams) => void;
}

const SumInput = (props: ISumInputProps) => {
  const { label, name, group, withInclusive = false, changeFormData } = props;

  return (
    <div className="sum-input">
      <div className="sum-input__label">
        <span>{label}</span>
        {withInclusive && (
          <Checkbox label="включительно" name={`${name}-or-equal`} group={group} changeFormData={changeFormData} />
        )}
      </div>

      <TextInput
        type="number"
        name={name}
        sign="руб."
        group={group}
        changeFormData={changeFormData}
      />
    </div>
  );
};

export default SumInput;
