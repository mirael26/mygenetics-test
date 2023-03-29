interface IPaginationProps {
  setActiveDiscountId: React.Dispatch<React.SetStateAction<number>>;
  discountCount: number;
  activeDiscountId: number;
}

const Pagination = (props: IPaginationProps) => {
  const { setActiveDiscountId, discountCount, activeDiscountId } = props;

  const numberButtons = Array(discountCount)
    .fill(null)
    .map((el, i) => {
      const activeClass = activeDiscountId === i ? " is-active" : "";
      return (
        <button
          key={`number-button-${i + 1}`}
          className={`button pagination__button${activeClass}`}
          onClick={() => setActiveDiscountId(i)}
        >
          {i + 1}
        </button>
      );
    });

  const handlePrevButtonClick = () => {
    setActiveDiscountId(activeDiscountId - 1);
  };

  const handleNextButtonClick = () => {
    setActiveDiscountId(activeDiscountId + 1);
  };

  const isPrevDisabled = activeDiscountId === 0;
  const isNextDisabled = activeDiscountId === discountCount - 1;

  return (
    <div className="pagination">
      <button
        className="button pagination__button"
        disabled={isPrevDisabled}
        onClick={handlePrevButtonClick}
      >
        {"<"}
      </button>
      {numberButtons}
      <button
        className="button pagination__button"
        disabled={isNextDisabled}
        onClick={handleNextButtonClick}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
