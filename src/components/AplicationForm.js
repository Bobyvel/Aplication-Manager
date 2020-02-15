import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { formErrors } from "../FormErrors";
import uuid from "uuid";

export default class AplicationForm extends Component {
  state = {
    student: {
      id: "",
      name: "",
      email: "",
      age: 0,
      phone: "",
      selectedOption: "",
      level: "",
      startDate: "",
      skills: "",
      info: "",
      fromHome: false
    },
    allStudents: [],
    baseState: {},
    validationErr: ""
  };

  componentDidMount() {
    const existingRecords =
      localStorage.getItem("students") !== null
        ? JSON.parse(localStorage.getItem("students"))
        : [];

    this.setState({
      baseState: { ...this.state.student },
      allStudents: [...existingRecords]
    });

    if (this.props.editId !== "") {
      const student = existingRecords.find(s => s.id === this.props.editId);
      console.log(student);
      this.setState({ student: student });
    }
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      student: { ...this.state.student, [name]: value }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let newStudent = this.state.student;
    if (formErrors(newStudent) !== "") {
      const validationErr = formErrors(newStudent);
      this.setState({ validationErr });
      console.log(validationErr);
    } else {
      if (newStudent.id !== "") {
        const filetered = this.state.allStudents.filter(
          s => s.id !== newStudent.id
        );
        this.setState(
          {
            allStudents: [...filetered, newStudent],
            student: { ...this.state.baseState }
          },
          () => {
            localStorage.setItem(
              "students",
              JSON.stringify(this.state.allStudents),
              this.props.history.push("/")
            );
          }
        );
      } else {
        newStudent.id = uuid();
        this.setState(
          {
            allStudents: [...this.state.allStudents, newStudent],
            student: { ...this.state.baseState }
          },
          () => {
            localStorage.setItem(
              "students",
              JSON.stringify(this.state.allStudents),
              this.props.history.push("/")
            );
          }
        );
      }
    }
  };

  render() {
    return (
      <Fragment>
        <Link to="/">All Aplicants</Link>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <h1>Student Aplication</h1>
            <ul className="form-style-1">
              <li>
                <label>
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="field-long"
                  value={this.state.student.name}
                  onChange={this.handleChange}
                  required
                />
              </li>
              <li>
                <label>
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="field-long"
                  value={this.state.student.email}
                  onChange={this.handleChange}
                  required
                />
              </li>
              <li>
                <label>
                  Age <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  className="field-long"
                  value={this.state.student.age}
                  onChange={this.handleChange}
                  required
                />
              </li>
              <li>
                <label>
                  Phone Number: <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  className="field-long"
                  value={this.state.student.phone}
                  onChange={this.handleChange}
                  required
                />
              </li>
              <li>
                <p>
                  Preferred Way of Communication:
                  <span className="required">*</span>
                </p>
                <label>
                  <input
                    type="radio"
                    name="selectedOption"
                    className="field-box"
                    value="phone"
                    checked={this.state.student.selectedOption === "phone"}
                    onChange={this.handleChange}
                    required
                  />
                  Phone
                </label>
                <label>
                  <input
                    type="radio"
                    name="selectedOption"
                    className="field-box"
                    value="email"
                    checked={this.state.student.selectedOption === "email"}
                    onChange={this.handleChange}
                    required
                  />
                  E-mail
                </label>
              </li>

              <li>
                <label>
                  English Level: <span className="required">*</span>
                </label>
                <select
                  required
                  name="level"
                  className="field-select"
                  value={this.state.student.level}
                  onChange={this.handleChange}
                >
                  <option value="default"></option>
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advance">Advance</option>
                </select>
              </li>
              <li>
                <label>
                  Available to Start: <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  className="field-long"
                  value={this.state.student.startDate}
                  onChange={this.handleChange}
                  required
                />
              </li>
              <li>
                <label>
                  Technical Skills and Courses:
                  <textarea
                    name="skills"
                    className="field-long field-textarea"
                    value={this.state.student.skills}
                    onChange={this.handleChange}
                  />
                </label>
              </li>
              <li>
                <label>
                  Short Personal Presentation (e.g. reason for joining the
                  program):
                  <textarea
                    name="info"
                    className="field-long field-textarea"
                    value={this.state.student.info}
                    onChange={this.handleChange}
                  />
                </label>
              </li>
              <li>
                <label>
                  "Study from home":
                  <input
                    type="checkbox"
                    name="fromHome"
                    className="field-box"
                    checked={this.state.student.fromHome}
                    onChange={this.handleChange}
                  />
                </label>
              </li>
              {this.state.validationErr !== "" ? (
                <h3 className="err">{this.state.validationErr}</h3>
              ) : (
                ""
              )}
              <li>
                <input type="submit" value="Submit" />
              </li>
            </ul>
          </form>
        </div>
      </Fragment>
    );
  }
}
