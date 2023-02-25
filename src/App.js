import React, { useEffect } from "react";
import "./styles.css";
//theme primereact
// import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/themes/tailwind-light/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
// import "primeflex/primeflex.css";
import { Card } from "primereact/card";
import { doc, deleteDoc } from "firebase/firestore";
import { getDb } from "./services/db";

import LogTable from "./components/LogTable";
import UserSelect from "./components/UserSelect";
import { findAllUsers } from "./services/users.js";
import { findAllEvents } from "./services/events.js";
import { findAllLogs } from "./services/logs.js";
import EventSelect from "./components/EventSelect";

export default function App() {
  const [users, setUsers] = React.useState(null);
  const [logs, setLogs] = React.useState(null);
  const [events, setEvents] = React.useState(null);
  const [userSelection, setUserSelection] = React.useState(null);
  const [eventSelection, setEventSelection] = React.useState(null);
  const [toBeDeletedId, setToBeDeletedId] = React.useState(null);
  const [showUserTable] = React.useState(false);
  const [timeType, setTimeType] = React.useState(null);
  const [loadingUsers, setLoadingUsers] = React.useState(false);
  const [loadingLogs, setLoadingLogs] = React.useState(false);
  const [loadingEvents, setLoadingEvents] = React.useState(false);
  // console.log("selection:", selection);

  async function getUsers() {
    setLoadingUsers(true);
    const response = await findAllUsers();
    setUsers([...response]);
    setLoadingUsers(false);
  }
  React.useEffect(() => {
    getUsers();
  }, []);

  async function getEvents() {
    setLoadingEvents(true);
    const response = await findAllEvents();
    setEvents([...response]);
    setLoadingEvents(false);
  }
  React.useEffect(() => {
    getEvents();
  }, []);

  async function getLogs() {
    setLoadingLogs(true);
    const response = await findAllLogs();
    setLogs([...response]);
    setLoadingLogs(false);
  }
  React.useEffect(() => {
    getLogs();
  }, []);

  React.useEffect(() => {
    getEvents();
    getUsers();
    getLogs();
  }, [toBeDeletedId, eventSelection]);

  const deleteEvent = (e) => {
    console.log("Clicked delete for:", e);
    const docRef = doc(getDb(), "logs", e);

    deleteDoc(docRef)
      .then(() => {
        setToBeDeletedId(e);
        console.log("Entire Document has been deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!users) return [];

  return (
    <div className="App">
      <Card title="Dasko Inklok App">
        <UserSelect
          userSelection={userSelection}
          setUserSelection={setUserSelection}
          users={users}
        />
        {userSelection && (
          <EventSelect
            eventSelection={eventSelection}
            setEventSelection={setEventSelection}
            events={events}
            userSelection={userSelection}
          />
        )}
        {userSelection && (
          <LogTable
            deleteEvent={deleteEvent}
            logs={logs}
            users={users}
            events={events}
            userSelection={userSelection}
          />
        )}
      </Card>
    </div>
  );
}
