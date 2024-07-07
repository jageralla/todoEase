const todos = [
  {
    id: 3,
    task: "tasdasdasdas",
    created_at: "2024-05-22T06:58:53.584763Z",
    is_completed: false,
    author: 1,
  },
  {
    id: 4,
    task: "asdasdasdasd",
    created_at: "2024-05-22T06:58:56.550275Z",
    is_completed: false,
    author: 1,
  },
  {
    id: 5,
    task: "asdasdasd",
    created_at: "2024-05-22T06:59:00.251146Z",
    is_completed: false,
    author: 1,
  },
  {
    id: 6,
    task: "werwer",
    created_at: "2024-05-22T07:13:20.210576Z",
    is_completed: false,
    author: 1,
  },
  {
    id: 7,
    task: "sadasdasd",
    created_at: "2024-05-22T07:14:21.892303Z",
    is_completed: true,
    author: 1,
  },
];

const filter = "completed";

const filteredTodos = todos.filter((todo) => {
  if (filter === "completed") return todo.is_completed;
});

console.log(filteredTodos);
