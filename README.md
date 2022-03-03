# Interview Scheduler

Interview Scheduler is a single page app built in react that allows users to schedule interviews in different timeslots on different days. The app uses state management and custom hooks to render Interview data dynamically, according to the name of the student being interviewed, the time slot for their interview and the name of their interviewer, separated into different weekdays.

These interview appointments can be freely added, updated or deleted by the user, and the page will render the appropriate content without needing to refresh. Additionally, the functionality of this app has been confirmed by a number of different tests carried out by storybook, jest and cypress, and its updates are managed by a continuous development pipeline using CircleCI, gitHub and Netlify.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
