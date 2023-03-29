import DiscountForm from "../components/discount-form/discount-form";
import PageContainer from "../components/page-container/page-container";
import { IDiscountInfo } from '../types';

interface IFormPageProps {
  addDiscount: (info: IDiscountInfo) => void;
}

const FormPage = ({addDiscount}: IFormPageProps) => {
  return (
    <PageContainer>
      <h1 className="title">Добавление скидки</h1>
      <DiscountForm addDiscount={addDiscount} />
    </PageContainer>
  );
};

export default FormPage;
