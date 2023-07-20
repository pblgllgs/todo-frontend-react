import { useEffect, useState } from "react";
import { deleteTodo, retrieveAllTodosForUsername } from "./api/TodosApiService";
import Swal from "sweetalert2";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export const ListTodosComponent = () => {
  const [todos, setTodos] = useState([]);
  const { username } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    callTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callTodos = async () => {
    const response = await retrieveAllTodosForUsername(username,token);
    try {
      setTodos(response.data);
    } catch (error) {
      console.log(response);
    } finally {
      console.log("cleanup");
    }
  };

  const handleDelete = (username, id) => {
    Swal.fire({
      title: "Seguro quieres eliminar",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No eliminar`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteTodo(username, id)
          .then(() => {
            setLoading(true);
            callTodos();
            Swal.fire("Eliminado", "Se ha eliminado con éxito!", "success");
            setTimeout(() => {
              setLoading(false);
            }, 150);
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(error.message, error.name, "error");
          });
      } else if (result.isDenied) {
        Swal.fire("Aviso", "La operación no se completó", "info");
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/todo/${id}`);
  };

  const handleAdd = () => {
    navigate(`/todo/-1`);
  };

  const Loading = () => {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border m-5 text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  };

  if (todos.length === 0)
    return <div className="alert alert-info">No todos to show</div>;

  return (
    <div className="container">
      <h1>Things You Want to do!</h1>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Target Date</th>
                <th>Done</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, i) => {
                return (
                  <tr key={i}>
                    <td>{todo.description}</td>
                    <td>{todo.targetDate.toString()}</td>
                    <td>{todo.done.toString()}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => handleDelete(todo.username, todo.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-info"
                        type="button"
                        onClick={() => handleUpdate(todo.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div className="btn btn-success m-5" type="button" onClick={handleAdd}>
          Add New Todo
        </div>
      </div>
    </div>
  );
};
