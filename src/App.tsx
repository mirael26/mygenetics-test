import { Navigate, Route, Routes } from 'react-router-dom';
import DiscountsPage from './pages/discounts-page';
import FormPage from './pages/form-page';
import NotFoundPage from './pages/not-found-page';

const AppUrl = {
  Main: '/',
  Discounts: '/discounts',
  Form: '/form'
}

const App = () => (
  <Routes>
    <Route path={AppUrl.Main} element={<Navigate replace to={AppUrl.Discounts} />}/>
    <Route path={AppUrl.Discounts} element={<DiscountsPage />}/>
    <Route path={AppUrl.Form} element={<FormPage />}/>
    <Route path='/*' element={<NotFoundPage />}/>
  </Routes>
)

export default App;
