import { useParams } from "react-router";
import { useState } from "react";
import { getHabitById } from "../../utils/habitStorage";

const Detail = () => {
  const { id } = useParams();
  const [habitDetails] = useState(() => getHabitById(id));

  return (
    <div>
      {habitDetails ? (
        <p>
          Showing details of habit with ID: {habitDetails.id}. Name:{" "}
          {habitDetails.name}
        </p>
      ) : (
        <p>Habit not found.</p>
      )}
    </div>
  );
};

export default Detail;
