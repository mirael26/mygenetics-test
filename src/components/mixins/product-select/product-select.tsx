import Select from 'react-select';
import { IChangeFormDataParams } from '../../../types';

interface IProductSelectProps {
  label: string;
  name: string;
  group: string;
  selectList: Array<{value: string, label: string}>;
  changeFormData: (params: IChangeFormDataParams) => void;
}

const ProductSelect = ({ label, name, group, selectList, changeFormData }: IProductSelectProps) => {

  const handleSelectChange = (evt: any) => {
    changeFormData({
      group,
      name,
      value: evt,
    })
  };

  return (
    <div className="product-select">
      <div className="product-select__label">{label}</div>
      {/* <select className="product-select__select" name={`${name}[]`} multiple size={3} onChange={handleSelectChange}>
        {selectList.map((item) => (
          <option key={`${name}-${item}-option`} className="product-select__option" value={item}>
            {item}
          </option>
        ))}
      </select> */}
      <Select
        onChange={handleSelectChange}
        isMulti
        name={`${name}[]`}
        options={selectList}
        className="product-select__select"
        classNamePrefix="react-select"
        placeholder="Выберите продукты"
      />
    </div>
  );
};

export default ProductSelect;
