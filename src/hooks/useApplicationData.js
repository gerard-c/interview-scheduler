import { useState, useEffect } from "react";
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
  
    setState({
      ...state,
      appointments
    });
  
    return axios.put(`/api/appointments/${id}`, appointment);
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
  
    setState({
      ...state,
      appointments
    });
  
    return axios.delete(`/api/appointments/${id}`);
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
