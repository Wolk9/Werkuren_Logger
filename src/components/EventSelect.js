import React from "react";
import { Button } from "primereact/button";

const EventSelect = (props) => {
  const { eventSelection, setEventSelection, events } = props;

  console.log(props);

  const SelectedButton = () => {
    return (
      <div>
        {events.map((event) => (
          <Button
            label={event.eventType}
            key={event.id}
            severity={eventSelection !== event.eventId ? "" : "success"}
            outlined={eventSelection !== event.eventId}
            onClick={() => setEventSelection(event.eventId)}
          />
        ))}
      </div>
    );
  };
  return (
    <div>
      {!eventSelection ? (
        <h3>no event selected</h3>
      ) : (
        <h3>
          Event{" "}
          {events.find((event) => event.eventId === eventSelection).eventType}{" "}
          is selected
        </h3>
      )}
      <SelectedButton />
    </div>
  );
};

export default EventSelect;
