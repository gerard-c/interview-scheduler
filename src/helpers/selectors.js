export function getAppointmentsForDay(state, day) {
  const resultsArray = [];
  let targetDay = null;

  if (!state.days.length) {
    return resultsArray;
  }

  // const appointmentsArray = Object.values(state.appointments);

  for (const item of state.days) {
    if (item.name === day) {
      targetDay = item;
    }
  }

  if (!targetDay) {
    return resultsArray;
  }

  for (const appointmentId of targetDay.appointments) {
    for (const appointment of appointmentsArray) {
      if (appointmentId === appointment.id) {
        resultsArray.push(appointment);
      }
    }
  }
  return resultsArray;
}

export function getInterview(state, interview) {
  const interviewObject = {
    student: '',
    interviewer: {}
  };

  if (!interview) {
    return null;
  }

  const appointmentsArray = Object.values(state.appointments);

  for (const appointment of appointmentsArray.filter(appointment => appointment.interview)) {
    if (appointment.interview.id === interview.id) {
      interviewObject.student = interview.student;
      interviewObject.interviewer = state.interviewers[interview.interviewer];
    }
  }

  return interviewObject;
}

export function getInterviewersForDay(state, day) {
  const resultsArray = [];
  let targetDay = null;

  if (!state.days.length) {
    return resultsArray;
  }

  const interviewersArray = Object.values(state.interviewers);

  for (const item of state.days) {
    if (item.name === day) {
      targetDay = item;
    }
  }

  if (!targetDay) {
    return resultsArray;
  }

  for (const interviewerId of targetDay.interviewers) {
    for (const interviewer of interviewersArray) {
      if (interviewerId === interviewer.id) {
        resultsArray.push(interviewer);
      }
    }
  }
  return resultsArray;
}