import { IChangeFormDataParams } from "../../../types";

interface ITextareaProps {
  label?: string;
  name: string;
  changeFormData: (params: IChangeFormDataParams) => void;
}

const Textarea = (props: ITextareaProps) => {
  const { label, name, changeFormData } = props;

  const handleInputChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (changeFormData) {
      changeFormData({
        name: name,
        value: evt.target.value,
      });
    }
  };

  return (
    <div className="textarea">
      <label>
        <span className="textarea__label">{label}</span>
        <textarea
          className="textarea__textarea"
          name={name}
          onChange={handleInputChange}
        ></textarea>
      </label>
    </div>
  );
};

export default Textarea;
