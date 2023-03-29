import { IChangeFormDataParams } from '../../../types';

interface ICheckboxProps {
  isChecked?: boolean;
  name: string;
  group?: string;
  label: string;
  changeFormData?: (params: IChangeFormDataParams) => void;
}

const Checkbox = (props: ICheckboxProps) => {
  const { name, group, changeFormData, label } = props;

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (changeFormData) {
      changeFormData({
        group: group,
        name: name,
        value: evt.target.checked.toString(),
      });
    }
  };

  return (
    <div className="checkbox">
      <label key={`${name}-checkbox`}>
        <input
          className="checkbox__input visually-hidden"
          type="checkbox"
          name={name}
          onChange={handleInputChange}
        />
        <span className="checkbox__label">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
