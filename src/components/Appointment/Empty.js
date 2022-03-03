import React from "react";

// Default component rendered in Apppointment slots, contains nothing but a button that prompts user to book a new interview

export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}