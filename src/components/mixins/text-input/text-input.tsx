import { IChangeFormDataParams } from "../../../types";

interface ITextInputProps {
  type?: "text" | "number" | "datetime-local";
  label?: string;
  name: string;
  group?: string;
  sign?: string;
  required?: boolean;
  changeFormData?: (params: IChangeFormDataParams) => void;
}

const TextInput = (props: ITextInputProps) => {
  const {
    type = "text",
    label,
    name,
    group,
    sign,
    required = false,
    changeFormData,
  } = props;

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (changeFormData) {
      changeFormData({
        group: group,
        name: name,
        value: evt.target.value,
      });
    }
  };

  return (
    <div className="text-input">
      <label>
        {label && <span className="text-input__label">{label}</span>}
        <input
          className="text-input__input"
          type={type}
          name={name}
          required={required}
          onChange={handleInputChange}
        />
        {sign && <span className="text-input__sign">{sign}</span>}
      </label>
    </div>
  );
};

export default TextInput;
