import { useState, useEffect } from "react";
import axios from "axios";

// Hook manages the majority of state data used by the app, as well as the logic related to most of the user interactions with the app

export function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Triggered by selection of different day on the nav bar, prompting the Application to render different Appointments tied to specific days of the week

  const setDay = day => setState({ ...state, day });

  // Triggered by clicking of the save button in the Form component. Copies appointment data from state, updates the appropriate appointment with information entered into the form and then sets the appropriate state with the modified information in a way that avoids mutation of data saved in state

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Function also uses state data related to the selected day in order to update the 'spots counter' seen under each day on the nav bar without requiring a page refresh

    const days = [...state.days]

    const index = days.map(day => day.name).indexOf(state.day);

    const day = days[index]

    // Spot count goes down if a new interview is being created, stays the same when an existing interview is edited

    if (!state.appointments[id].interview) {
      day.spots--;
    }

    days[index] = day;

    // Changes are relayed to both the database and the state

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

  // Functions almost exactly the same as the previous function, except it removes interviews instead of creating/updating them

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

    const day = days[index];

    // When an interview is removed, the spots counter goes up by one

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

  // GETs all necessary information from the scheduler api and then saves that data to state, so that it may be used by the different components that render the elements of the UI

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
