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