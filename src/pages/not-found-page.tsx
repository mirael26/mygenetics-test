import NotFound from "../components/not-found/not-found";
import PageContainer from "../components/page-container/page-container";

const NotFoundPage = () => {
  return (
    <PageContainer>
      <h1 className="visually-hidden">Несуществующая страница</h1>
      <NotFound />
    </PageContainer>
  );
};

export default NotFoundPage;
