/* eslint-disable react/prop-types */
const Spinner = ({ color = "#007bff" }) => {
  return (
    <div
      className="spinner-border"
      role="status"
      style={{ width: "19px", height: "19px", color: "#3b324e" }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
