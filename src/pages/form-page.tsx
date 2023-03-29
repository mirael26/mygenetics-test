import DiscountForm from "../components/discount-form/discount-form";
import PageContainer from "../components/page-container/page-container";

const FormPage = () => {
  return (
    <PageContainer>
      <h1 className="title">Добавление скидки</h1>
      <DiscountForm />
    </PageContainer>
  );
};

export default FormPage;
