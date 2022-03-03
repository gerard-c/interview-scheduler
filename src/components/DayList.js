import React from "react";
import DayListItem from "./DayListItem";

// Nav bar redirecting to different days of the week

export default function DayList(props) {
  const parsedDays = props.days.map(day => {
  return <DayListItem
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.value}
    setDay={props.onChange}    
  />});

  return (
    <ul>
      {parsedDays}
    </ul>
  )
}