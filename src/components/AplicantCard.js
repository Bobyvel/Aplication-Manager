import React from "react";

export default function AplicantCard(props) {
  const {
    id,
    name,
    email,
    age,
    phone,
    prWay,
    level,
    startDate,
    skills,
    info,
    home,
    onDelete,
    onEdit
  } = props;

  return (
    <div className="column">
      <div className="card">
        <h3>Name: {name}</h3>
        <p>
          <span>e-mail:</span> {email}
        </p>
        <p>
          <span>age:</span> {age}
        </p>
        <p>
          <span>phone:</span> {phone}
        </p>
        <p>
          <span>contact on:</span> {prWay}
        </p>
        <p>
          <span>endlish level:</span> {level}
        </p>
        <p>
          <span>start date:</span> {startDate}
        </p>
        <p>
          <span>skills:</span> {skills}
        </p>
        <p>{info}</p>
        <p>
          <span>work from home:</span> {home ? "yes" : "no"}
        </p>
        <div className="btn">
          <button onClick={() => onDelete(id)} className="del-btn">
            Delete
          </button>
          <button onClick={() => onEdit(id)} className="edit-btn">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
