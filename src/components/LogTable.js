import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Card } from "primereact/card";
import { useState } from "react";

const deleteEvent = (e) => {
  console.log("Clicked delete for:", e);
};

const TableItem = (props) => {
  const { eventId, timestamp, userId, logId } = props;

  console.log("TableItem props: ", props);

  return (
    <tr key={logId}>
      <td>{eventId}</td>
      <td>{timeDate()}</td>
      <td>
        <i className="pi pi-delete-left" style={{ color: "red" }}></i>
      </td>
    </tr>
  );
};

const LogTable = (props) => {
  const { logs, users, events, userSelection, eventSelection } = props;
  const [selectedLog, setSelectedLog] = useState(null);
  console.log("LogTable props: ", props);

  const selectedLogs = logs.filter((log) => {
    return log.userId == userSelection;
  });

  const selectedUser = users.filter((user) => {
    return user.userId == userSelection;
  });

  const timeDate = (timestamp) => {
    let stampObj = timestamp.toDate();

    console.log(timestamp.seconds, stampObj);

    let day = stampObj.getDate();
    let month = stampObj.getMonth() + 1;
    let year = stampObj.getFullYear();
    let hour = stampObj.getHours();
    let minutes = stampObj.getMinutes();

    return `${day}-${month}-${year} ${hour}:${minutes}`;
  };

  console.log(
    "1 events:",
    events,
    "logs:",
    logs,
    "users:",
    users,
    "userSelection:",
    userSelection,
    "selectedLogs:",
    selectedLogs.timestamp,
    "selectedUser",
    selectedUser
  );

  // selectedLogs.map(
  //   (x, i) => (x[i].timestamp.seconds = timeDate(x[i].timestamp))
  // );

  const stampBodyTemplate = (rowData) => {
    return timeDate(rowData.timestamp);
  };

  const eventBodyTemplate = (rowData) => {
    return events.find((x) => x.eventId == rowData.eventId).eventType;
  };

  return (
    <Card title={selectedUser[0].firstName}>
      <p>Selected Log: {selectedLog}</p>
      <DataTable
        value={selectedLogs}
        selectionMode="single"
        selection={selectedLog}
        onSelectionChange={(e) => setSelectedLog(e.value)}
        dataKey="id"
      >
        <Column header="begin/einde" body={eventBodyTemplate}></Column>
        <Column header="datum/tijd" body={stampBodyTemplate}></Column>
      </DataTable>
      {/* <table>
        <thead>
          <tr>
            <th>In/Uit</th>
            <th>Datum/Tijd</th>
          </tr>
        </thead>
        <tbody>
          {selectedLogs.map((log) => (
            <TableItem
              key={log.id}
              logId={log.logId}
              timestamp={log.timestamp}
              userId={log.userId}
              onclick={deleteEvent(log.logId)}
            />
          ))}
        </tbody>
      </table> */}
    </Card>
  );
};

export default LogTable;
