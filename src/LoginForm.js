import { Formik } from "formik";
import { Field } from "formik";
import React, { useState } from "react";
import { Component } from "react";
import axios from 'axios';
import * as EmailValidator from 'email-validator';
import Switch from 'react-switch';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    console.log('This happens 1st.');
    this.state = {
      email: null,
      name: null,
    }
  }

  loadData() {
    axios.get('http://www.mocky.io/v2/5de6c328370000a21d0925f2')
      .then(response => {
        var jsonData = JSON.parse(JSON.stringify(eval('(' + response.data + ')')));
        this.setState({ email: jsonData.user.email });
        this.setState({ name: jsonData.user.name });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    if (!this.state.email) {
      return <div />
    }
    else {
      const { email } = this.state;
      return (
        <Formik
          initialValues={{ email: email, password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log("Logging in", values);
              setSubmitting(false);
            }, 500);
          }}

          /* Start - Validations */
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = "Required";
            }
            else if (!EmailValidator.validate(values.email)) {
              errors.email = "Invalid email address";
            }
            const userName = email.match(/^([^@]*)@/)[1];
            const passwordDigitsRegex = /(?=.*[0-9])/;
            const passwordLowerCaseRegex = /(?=.*[a-z])/;
            const passwordUpperCaseRegex = /(?=.*[A-Z])/;
            if (!values.password) {
              errors.password = "No password provided";
            }

            if (values.password.length > 7 && values.password.length < 73) {
              document.getElementById("rule1").style = "text-decoration: line-through";
            } else {
              errors.password = "8-72 characters";
              document.getElementById("rule1").style = "text-decoration: none";
            }

            if (passwordUpperCaseRegex.test(values.password)) {
              document.getElementById("rule2").style = "text-decoration: line-through";
            } else {
              errors.password = "1 UpperCase Character";
              document.getElementById("rule2").style = "text-decoration: none";
            }

            if (passwordLowerCaseRegex.test(values.password)) {
              document.getElementById("rule3").style = "text-decoration: line-through";
            } else {
              errors.password = "1 Lowercase Character";
              document.getElementById("rule3").style = "text-decoration: none";
            }

            if (passwordDigitsRegex.test(values.password)) {
              document.getElementById("rule4").style = "text-decoration: line-through";
            } else {
              errors.password = "1 Number";
              document.getElementById("rule4").style = "text-decoration: none";
            }

            if (values.password.toLowerCase() !== email.toLowerCase()) {
              document.getElementById("rule5").style = "text-decoration: line-through";
            } else {
              errors.password = "Cannot be your email";
              document.getElementById("rule5").style = "text-decoration: none";
            }

            if (!values.password.toLowerCase().includes(userName.toLowerCase())) {
              document.getElementById("rule6").style = "text-decoration: line-through";
            } else {
              errors.password = "Cannot include your name";
              document.getElementById("rule6").style = "text-decoration: none";
            }

            return errors;
          }}
        /* End - Validations */
        >
          {props => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit
            } = props;
            return (
              <form onSubmit={handleSubmit} >
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email && "error"}
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}

                <div>
                  <label htmlFor="email">Password</label>
                  <Field
                    name="password"
                    className="form-control rounded-0"
                    validate={required}
                    component={PasswordShowHide}
                  />
                </div>
                <table id="passwordRulesStrikethrough">
                  <tbody>
                  <tr>
                    <td> <p id="rule1"> <span className="dot"></span> 8-72 characters </p></td>
                    <td> <p id="rule2"> <span className="dot"></span> 1 Uppercase Character </p></td>
                  </tr>
                  <tr>
                    <td> <p id="rule3"> <span className="dot"></span> 1 Lowercase Character </p></td>
                    <td> <p id="rule4"> <span className="dot"></span> 1 Number </p></td>
                  </tr>
                  <tr>
                    <td> <p id="rule5"> <span className="dot"></span> Should Not Match Your Email Address </p></td>
                    <td> <p id="rule6"> <span className="dot"></span> Should Not Contain Your Name </p></td>
                  </tr>
                  </tbody>
                </table>
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
                <button type="submit" disabled={errors.password}>
                  Login
          </button>
              </form>
            );
          }}
        </Formik>
      )
    }
  }
}

const required = value => (value ? undefined : "Required");

const PasswordShowHide = ({ field, form }) => {
  const [showHidePassword, changeShowHidePassword] = useState(false);
  return (
    <div className="input-container">
      <input
        type={showHidePassword ? "text" : "password"}
        {...field}
        placeholder="Password"
      />
      <div>
      <input type="checkbox" onChange={() => changeShowHidePassword(!showHidePassword)}></input>
      <span> Show/Hide Password </span>
      </div>
    </div>
  );
};


export default LoginForm;