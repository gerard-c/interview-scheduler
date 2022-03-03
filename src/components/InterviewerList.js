import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";
import 'components/InterviewerList.scss';

// List of interviewer profile pictures used by Form component when a user wants to book an interview

export default function InterviewerList(props) {
  const parsedInterviewers = props.interviewers.map(interviewer => {
    return <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)}
    />
  });

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {parsedInterviewers}
    </ul>
  </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};