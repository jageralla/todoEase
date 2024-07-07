/* eslint-disable react/prop-types */

const FilterNavItem = ({ filter, currentFilter, setFilter, children }) => {
  return (
    <li onClick={() => setFilter(filter)}>
      <span
        className={`todo-status ${
          filter === currentFilter ? "active-link" : ""
        }`}
      >
        {children}
      </span>
    </li>
  );
};

export default FilterNavItem;
