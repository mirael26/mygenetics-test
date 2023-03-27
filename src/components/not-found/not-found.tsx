import { Link } from "react-router-dom";
import { AppUrl } from "../../consts";

const NotFound = () => (
  <div className="not-found">
    <p className="not-found__message">
      404 Not Found
      <br />
      Страница не найдена
    </p>
    <Link to={AppUrl.Main} className="button not-found__button">
      На главную
    </Link>
  </div>
);

export default NotFound;
