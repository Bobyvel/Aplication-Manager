import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import AplicantCard from "./AplicantCard";

export default function AllAplicants(props) {
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    setAllStudents(JSON.parse(localStorage.getItem("students")));
  }, []);

  const handelDelete = id => {
    const remainStudents = allStudents.filter(s => s.id !== id);
    setAllStudents(remainStudents);
    localStorage.setItem("students", JSON.stringify(remainStudents));
  };

  const handelEdit = id => {
    console.log(id);
    props.editForm(id);
    props.history.push("/add");
  };

  const showStudents = () => {};

  let aplicants = allStudents ? (
    allStudents.map(s => (
      <AplicantCard
        key={s.id}
        id={s.id}
        name={s.name}
        email={s.email}
        age={s.age}
        phone={s.phone}
        prWay={s.selectedOption}
        level={s.level}
        startDate={s.startDate}
        skills={s.skills}
        info={s.info}
        home={s.fromHome}
        onDelete={handelDelete}
        onEdit={handelEdit}
      />
    ))
  ) : (
    <p className="row-empty">No aplicants</p>
  );
  aplicants =
    aplicants.length === 0 ? (
      <p className="row-empty">No aplicants</p>
    ) : (
      aplicants
    );
  return (
    <Fragment>
      <Link to="/add">Add Aplicant</Link>
      <div className="content-wrapper">
        <h1>Students</h1>
        <div className="row">{aplicants}</div>
      </div>
    </Fragment>
  );
}
