export const ListTodosComponent = () => {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  );

  const todos = [
    {
      id: 1,
      description:
        "Eu tempor voluptate tempor nisi et ea officia ea ex laboris nisi est et nulla.",
      done: false,
      targetDate,
    },
    {
      id: 2,
      description: "Pariatur elit ea eu eiusmod eiusmod. ",
      done: false,
      targetDate,
    },
    {
      id: 3,
      description: "Excepteur nulla ut pariatur enim. ",
      done: true,
      targetDate,
    },
    {
      id: 4,
      description: "Mollit qui tempor esse amet occaecat aliquip dolor.",
      done: false,
      targetDate,
    },
    {
      id: 5,
      description:
        "Nostrud id nostrud fugiat aute deserunt incididunt culpa velit consectetur dolor.",
      done: true,
      targetDate,
    },
  ];

  return (
    <div className="container">
      <h1>Things You Want to do!</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>id</td>
              <td>description</td>
              <td>done</td>
              <td>target date</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, i) => {
              return (
                <tr key={i}>
                  <td>{todo.id}</td>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
