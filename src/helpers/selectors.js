export default function getAppointmentsForDay(state, day) {
  let targetDay = null;
  const appointmentsArray = Object.values(state.appointments);
  const resultsArray = [];

  for (const item of state.days) {
    if (item.name === day) {
      targetDay = item;
    }
  }

  if (targetDay.appointments.length === 0) {
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