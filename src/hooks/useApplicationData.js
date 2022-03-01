import { useState, useEffect } from "react";
import { getAppointmentsForDay } from "helpers/selectors";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...state.days]
    
    const index = days.map(day => day.name).indexOf(state.day);

    const day = days[index]
    
    if (!state.appointments[id].interview) {
      day.spots--;
    }

    days[index] = day;

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...state.days];

    const index = days.map(day => day.name).indexOf(state.day);
    console.log(state.day.name);
    
    const day = days[index];
    
    day.spots++;
    
    days[index] = day;

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState({
        ...state,
        appointments,
        days
      }));
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      const daysData = all[0].data;
      const appointmentsData = all[1].data;
      const interviewersData = all[2].data;

      setState(prev => ({
        ...prev,
        days: daysData,
        appointments: appointmentsData,
        interviewers: interviewersData
      }));
    }).catch(err => console.log('Get appointments error: ', err.message))
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
