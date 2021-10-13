# CS462 Beep Beep Team Project
"Beep Beep", a team project for SPD Singapore and the CS462 Internet of Things (IoT) module at Singapore Management University.

Initiated in AY2021/2022 Term 1.

# Introduction
Greetings, and welcome to the code repository for the Beep Beep project.

This project is an SMU-X industry project between Singapore Management University and SPD Singapore.

## Background
This project uses IoT to solve a process-related challenge faced by SPD in tracking attendance and temperature scanning of its members during its events.

## Meet the Team
- A
- B
- C
- D
- E

Special thanks to Pius Lee for instruction and mentorship through CS462.

# Technology

## Software
- Web stack: HTML, CSS, Javascript
- Cloud: Google Firebase and Firestore

## Hardware
- [Barcode scanner]()

# Collections
Collections are how Firebase and Firestore store values in its database. Each collection is similar to a table in a standard relational database.

The following are a list of collections that are used by the Beep Beep app to store data.

### Collection: events
```
eventDocumentId: {
  eventName: “Name of Event”,
  startDateTime: date_time,
  duration: minutes_numerical,
  attendees: {
    attendeeId: {
      attendeeName: “person_name”,
      round1Attendance: Boolean,
      round2Attendance: Boolean,
      round1Temperature: 0,
round2Temperature: 0,
    },
  }
}
```