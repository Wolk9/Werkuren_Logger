import { DataTable, Column } from "primereact/datatable";
import { Card } from "primereact/card";

const deleteEvent = (e) => {
  console.log("Clicked delete for:", e);
}

const TableItem = (props) => {
  const { eventId, timestamp, userId, logId } = props;

  console.log("TableItem props: ", props)

  const timeDate = () => {

    let stampObj = new Date(timestamp.seconds);
    console.log(timestamp.seconds, stampObj);


    let day = stampObj.getDate();
    let month = stampObj.getMonth() + 1;
    let year = stampObj.getFullYear();
    let hour = stampObj.getHours();
    let minutes = stampObj.getMinutes();

    return `${day}-${month}-${year} ${hour}:${minutes}`
  }

  return (
    <tr key={logId} >
            <td>{eventId}</td>
            <td>{timeDate()}</td>
            <td><i className="pi pi-delete-left"style={{ color: 'red' }} ></i></td>
          </tr>
  )
}

const LogTable = (props) => {
  const { logs, users, events, userSelection, eventSelection } = props;
  
  console.log("LogTable props: ", props)

  console.log("1 events:", events, "logs:", logs, "users:", users, "userSelection:", userSelection, "selectedLogs:", selectedLogs, "selectedUser", selectedUser );


  const selectedLogs = logs.filter( log => {
    return log.userId == userSelection
  })

  const selectedUser = users.filter( user => {
     return user.userId == userSelection
  })


  console.log("2 events:", events, "logs:", logs, "users:", users, "userSelection:", userSelection, "selectedLogs:", selectedLogs, "selectedUser", selectedUser);

  
  return (
    <Card title={selectedUser[0].firstName}>
      <table>
        <thead>
          <tr>
            <th>In/Uit</th>
            <th>Datum/Tijd</th>
          </tr>
        </thead>
        <tbody>
          {selectedLogs.map((log)=><TableItem key={log.id} logId={log.logId} timestamp={log.timestamp} userId={log.userId} onclick={deleteEvent(log.logId)}/>)} 
        </tbody>
      </table>
    </Card>
  );
};

export default LogTable;
