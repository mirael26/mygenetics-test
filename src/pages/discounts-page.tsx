import Discounts from "../components/discounts/discounts";
import NoDiscounts from "../components/no-discounts/no-discounts";
import PageContainer from "../components/page-container/page-container";
import { IDiscountInfo } from "../types";

interface IDiscountsPageProps {
  discountsList: Array<IDiscountInfo>;
}

const DiscountsPage = ({ discountsList }: IDiscountsPageProps) => {
  const isEmpty = !discountsList.length;

  return (
    <PageContainer>
      <h1 className="title">Список скидок</h1>
      {isEmpty ? <NoDiscounts /> : <Discounts />}
    </PageContainer>
  );
};

export default DiscountsPage;
