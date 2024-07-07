/* eslint-disable react/prop-types */
//import due_date_image from "../assets/due-date.png";
const Todo = ({ todo, onDelete, onToggleComplete }) => {
  const handleCheckboxChange = () => {
    onToggleComplete(todo.id);
  };
  return (
    <>
      <li className="list">
        <div className="task-container">
          <input
            type="checkbox"
            checked={todo.is_completed}
            onChange={handleCheckboxChange}
          />
          <span
            className="task"
            style={{
              textDecoration: todo.is_completed ? "line-through" : "none",
            }}
          >
            {todo.task}
          </span>
        </div>
        <div className="icon-background" onClick={() => onDelete(todo.id)}>
          <i className="bi bi-trash" style={{ fontSize: 18 }}></i>
        </div>
      </li>
    </>
  );
};

export default Todo;
