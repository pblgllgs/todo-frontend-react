import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { addTodo, retrieveTodo, updateTodo } from "./api/TodosApiService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import moment from "moment";

export const TodoComponent = () => {
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const { id } = useParams();
  const { username, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getTodo = () => {
    if (id != -1) {
      retrieveTodo(username, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((error) => console.log(error));
    }
  };

  const onSubmit = (values) => {
    const newTodo = {
      id,
      username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    if (id == -1) {
      console.log("create");
      delete newTodo.id;
      addTodo(username, newTodo).then((response) => {
        console.log(response.data);
        navigate(`/todos`);
        Swal.fire(
          `Guardado`,
          `Se han guardado los datos exitosamente`,
          `success`
        );
      });
    } else {
      console.log("update");
      updateTodo(username, id, newTodo)
        .then((response) => {
          navigate(`/todos`);
          Swal.fire(
            `Actualizado`,
            `Se ha actualizado la acción id: ${id} del usuario: ${username}`,
            `success`
          );
        })
        .catch((error) => console.log(error));
    }
  };

  const validate = (values) => {
    let errors = {};
    if (values.description.length < 5)
      errors.description = "Enter atleast 5 characters";
    if (
      values.targetDate == null ||
      values.targetDate === "" ||
      !moment(values.targetDate).isValid() ||
      !moment(values.targetDate).isAfter()
    )
      errors.description = "Enter a target date valid";
    console.log(values);
    return errors;
  };

  return (
    <div className="container">
      <h1>Enter todo details</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetData"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  name="description"
                  className="form-control"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <button type="submit" className="btn btn-success mt-3">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
