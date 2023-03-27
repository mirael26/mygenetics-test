import { Link } from 'react-router-dom';
import { AppUrl } from '../../consts';

const NoDiscounts = () => (
  <div className="no-discounts">
    <h1 className="visually-hidden">Скидки</h1>
    <p className="no-discounts__message">
      Скидок пока не добавлено
    </p>
    <Link to={AppUrl.Form} className="button no-discounts__button">Добавить скидку</Link>
  </div>
);

export default NoDiscounts;
