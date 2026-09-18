import { useParams } from "react-router";
import { useState } from "react";
import { getHabitById, getHabits, saveHabits } from "../../utils/habitStorage";
import styles from "./Detail.module.css";
import { useNavigate } from "react-router";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [habitDetails, setHabitDetails] = useState(() => getHabitById(id));

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleHabitChange = (field, value) => {
    setHabitDetails((prev) => {
      if (!prev) {
        return prev;
      }

      return { ...prev, [field]: value };
    });
  };

  const handleDayChange = (day, checked) => {
    setHabitDetails((prev) => {
      if (!prev) {
        return prev;
      }

      const days = checked
        ? [...new Set([...prev.days, day])]
        : prev.days.filter((selectedDay) => selectedDay !== day);

      return { ...prev, days };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!habitDetails) {
      return;
    }

    saveHabits(
      getHabits().map((habit) =>
        habit.id === habitDetails.id ? habitDetails : habit,
      ),
    );
    navigate("/", {
      state: {
        alert: {
          message: "Habit updated successfully.",
          type: "success",
        },
      },
    });
  };

  return (
    <div className={styles.detail}>
      {habitDetails ? (
        <form className={styles.detailForm} onSubmit={handleSubmit}>
          <div className={styles.detailHeader}>
            <input
              id="habitName"
              className={styles.habitName}
              type="text"
              value={habitDetails.name ?? ""}
              onChange={(e) => handleHabitChange("name", e.target.value)}
            />
            <p
              className={styles.doneDays}
            >{`You done this for ${habitDetails.checkIns.length} days`}</p>
          </div>

          <div className={styles.detailDetail}>
            <label className={styles.fieldLabel} htmlFor="habitQuantity">
              Quantity
            </label>
            <input
              id="habitQuantity"
              className={styles.detailQuantity}
              type="text"
              value={habitDetails.quantity ?? ""}
              onChange={(e) => handleHabitChange("quantity", e.target.value)}
            />
            <fieldset className={styles.daysFieldset}>
              <legend className={styles.daysLabel}>Repeat on</legend>
              <div className={styles.weekDaySelector}>
                {daysOfWeek.map((day) => (
                  <div key={day} className={styles.eachWeekDay}>
                    <input
                      id={`${day}Input`}
                      type="checkbox"
                      className={styles.weekDay}
                      checked={habitDetails.days.includes(day)}
                      onChange={(e) => handleDayChange(day, e.target.checked)}
                    />
                    <label htmlFor={`${day}Input`}>{day}</label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          <button type="submit" className={styles.submit}>
            Save changes
          </button>
        </form>
      ) : (
        <p>Habit not found.</p>
      )}
    </div>
  );
};

export default Detail;
