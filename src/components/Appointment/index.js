import React from "react";

export default function Appointment(props) {
  return (
    <article className="appointment">
      {!props.time && 'No appointments'}
      {props.time && `Appointment at ${props.time}`}
    </article>
  );
}