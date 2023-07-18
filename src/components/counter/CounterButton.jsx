import PropTypes from "prop-types";

export const CounterButton = ({
  by,
  incrementCountParent,
  decrementCountParent,
}) => {
  const incrementCounter = () => {
    incrementCountParent(by);
  };

  const decrementCounter = () => {
    decrementCountParent(by);
  };

  return (
    <>
      <div className="Counter">
        <div>
          <button className="counterButton button" onClick={decrementCounter}>
            -{by}
          </button>
          <button className="counterButton button" onClick={incrementCounter}>
            +{by}
          </button>
        </div>
      </div>
    </>
  );
};

CounterButton.propTypes = {
  by: PropTypes.number,
};
CounterButton.defaultProps = {
  by: 1,
};
