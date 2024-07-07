import React from 'react';

const NoTodosMessage = ({ filter }) => {
  let message;
  if (filter === "completed") {
    message = "No completed tasks.";
  } else if (filter === "active") {
    message = "No active tasks.";
  } else if (filter === "all") {
    message = "You have no task for the day!";
  }

  return (
    <div className='no-task-message'>
      {message}
    </div>
  );
};

export default NoTodosMessage;
