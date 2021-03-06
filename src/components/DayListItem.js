import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

// Discrete "day" components rendered on app's nav bar, displaying the name of the day and the amount of unbooked appointments remaining

export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  })

  const formatSpots = (spots) => {
    if (!spots) {
      return 'no spots remaining';
    }
    if (spots === 1) {
      return '1 spot remaining';
    }
    return `${spots} spots remaining`;
  }

  return (
    <li
    onClick={() => props.setDay(props.name)}
    className={dayClass}
    selected={props.selected}
    data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}