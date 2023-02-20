import { DataTable, Column } from "primereact/datatable";
import { Card } from "primereact/card";

const LogTable = (props) => {
  const { logs, userSelection } = props;

  console.log(logs, userSelection);
  return (
    <Card title="Log">
      <table>
        <thead>
          <tr>
            <th>In/Uit</th>
            <th>Datum/Tijd</th>
            <th>Werknemer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monte Falco</td>
            <td>1658</td>
            <td>Parco Foreste Casentinesi</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default LogTable;
