import { IDiscountInfo, TDiscountType } from "../../types";
import { DiscountTypeSign } from "../../consts";
import { getConditionsStrings } from "../../utils";

interface IDisplayedDiscountProps {
  discountInfo: IDiscountInfo;
}

const DisplayedDiscount = ({ discountInfo }: IDisplayedDiscountProps) => {
  const description =
    typeof discountInfo["description"] === "string"
      ? discountInfo.description
      : "Без описания";
  const discountAmount = `${discountInfo["discount-amount"]} ${
    DiscountTypeSign[discountInfo["discount-type"] as TDiscountType]
  }`;
  const conditions = getConditionsStrings(discountInfo);

  return (
    <div className="displayed-discount">
      <div className="displayed-discount__block">
        <p className="displayed-discount__label">Название</p>
        <p className="displayed-discount__title">{discountInfo.name}</p>
      </div>
      <div className="displayed-discount__block">
        <p className="displayed-discount__label">Описание</p>
        <p className="displayed-discount__text">{description}</p>
      </div>
      <div className="displayed-discount__block">
        <p className="displayed-discount__label">Размер скидки</p>
        <p className="displayed-discount__text">{discountAmount}</p>
      </div>
      <div className="displayed-discount__block">
        <p className="displayed-discount__label">Условия</p>

        <>
          {conditions.map((conditionStrings, i) => (
            <div key={`condition-string-${i}`}>
              <p className="displayed-discount__condition-string">
                {conditionStrings.map((conditionString, i) => (
                  <span key={`conditionString-${i}`}>
                    <span>{conditionString}</span>
                    {i < conditionStrings.length - 1 && (
                      <span className="displayed-discount__condition-operator"> И </span>
                    )}
                  </span>
                ))}
              </p>

              {i < conditions.length - 1 && (
                <p className="displayed-discount__condition-operator"> ИЛИ </p>
              )}
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default DisplayedDiscount;
