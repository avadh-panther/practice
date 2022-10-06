import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import apiUser from "../../services/apiUser";
import apiRole from "../../services/apiRole";

function Component() {
  const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  useEffect(() => {
    apiRole.getRoles().then((res) => setRole(res));
  }, []);

  const formHandler = (data) => {
    apiUser.createUser(data).then(navigate("/user"));
  };

  return (
    <div className="row">
      <div className="card card-primary col-md-8 offset-md-2 p-0 mt-5">
        <div className="card-header">
          <h3 className="card-title">Create User</h3>
        </div>

        <form onSubmit={handleSubmit(formHandler)}>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                className="custom-select rounded"
                name="role"
                id="role"
                {...register("role", {
                  validate: (value) => value != "select",
                })}
              >
                <option>select</option>
                {role.map((elem, i) => (
                  <option key={i} value={elem.id}>
                    {elem.name}
                  </option>
                ))}
              </select>
              {errors?.role && (
                <p className="text-danger"> please select role </p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Enter user full name"
                {...register("name", { required: true })}
              />
            </div>
            {errors?.name && <p className="text-danger"> please enter name </p>}

            <div className="form-group">
              <label htmlFor="email">E-mail :</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="Enter e-mail"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                })}
              />
            </div>
            {errors?.email?.type == "required" && (
              <p className="text-danger">email is required</p>
            )}
            {errors?.email?.type == "pattern" && (
              <p className="text-danger">enter valid email</p>
            )}

            <div className="form-group">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                autoComplete="on"
                {...register("password", { required: true })}
              />
            </div>
            {errors?.password && (
              <p className="text-danger"> Please enter password </p>
            )}

            <div className="form-group">
              <label htmlFor="confirm_password">Confirm Password :</label>
              <input
                type="password"
                name="confirm_password"
                className="form-control"
                id="confirm_password"
                placeholder="Renter password"
                autoComplete="on"
                {...register("confirm_password", {
                  required: true,
                  validate: (value) => value == getValues("password"),
                })}
              />
            </div>
            {errors?.confirm_password?.type == "required" && (
              <p className="text-danger">Please enter password again</p>
            )}
            {errors?.confirm_password?.type == "validate" && (
              <p className="text-danger">password missmatch</p>
            )}
          </div>

          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Create
            </button>{" "}
            <Link to="/user" className="btn btn-danger">
              Cancle
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function CreateUser() {
  const [...userPermissions] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      {userPermissions?.indexOf("add user") != -1 &&
      userPermissions.length > -1 ? (
        <Component />
      ) : (
        navigate("/", true)
      )}
    </>
  );

  // return userPermissions?.indexOf("add user") != -1 ? (
  //   <Component />
  // ) : (
  //   <Navigate to="/" />
  // );
}

export default CreateUser;
