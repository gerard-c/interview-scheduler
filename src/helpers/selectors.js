// Uses appointment information saved in state to generate an array of appointment objects related to a given day

export function getAppointmentsForDay(state, day) {
  const resultsArray = [];
  let targetDay = null;

  if (!state.days.length) {
    return resultsArray;
  }

  const appointmentsArray = Object.values(state.appointments);

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

// Consolidates relevant information about students, interviews and interviewers into a singular object to be used as a prop by other components

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

// Generates an array of interviewers available on a specific day in a fashion similar to the first helper function in this file

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