import React, { useEffect } from "react";
import "./styles.css";
//theme primereact
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import { Card } from "primereact/card";
import UserTable from "./components/UserTable";
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

  if (!users) return [];

  return (
    <div className="App">
      
      <Card>
        <center>
          <h3>DASKO Inklok App</h3>
        </center>
      </Card>
      <Card>
        <UserSelect
          userSelection={userSelection}
          setUserSelection={setUserSelection}
          users={users}
        />
        {userSelection && (<EventSelect
          eventSelection={eventSelection}
          setEventSelection={setEventSelection}
          events={events}
          userSelection={userSelection}
        />)}
        {userSelection && (
          <LogTable logs={logs} users={users} events={events} userSelection={userSelection} />
        )}
      </Card>
    </div>
  );
}
