import styles from "./Create.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";

const Create = () => {
  const navigate = useNavigate();

  const [newHabit, setNewHabit] = useState({
    name: null,
    quantity: null,
    days: [],
  });
  const [error, setError] = useState({});

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleDayChange = (day, checked) => {
    setNewHabit((prev) => ({
      ...prev,
      days: checked ? [...prev.days, day] : prev.days.filter((d) => d !== day),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!newHabit.name?.trim()) {
      validationErrors.name = "Habit name is required.";
    }

    if (!newHabit.quantity?.trim()) {
      validationErrors.quantity = "Quantity is required.";
    }

    if (newHabit.days.length === 0) {
      validationErrors.days = "Select at least one day.";
    }

    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // TODO: Post ke backend/ db lah
    console.log("Creating new habit:", newHabit);
    // TODO: Kembali ke halaman home
    navigate("/");
  };

  return (
    <div className={styles.create}>
      <div className={styles.createHeader}>
        <p className={styles.eyebrow}>Feeling Brave?</p>
        <p className={styles.title}>Create a new habit</p>
      </div>
      <form className={styles.newHabitForm} onSubmit={handleSubmit}>
        {error.name && <p className={styles.errorMessage}>{error.name}</p>}
        <label htmlFor="name">New Habit Name</label>
        <input
          type="text"
          id="name"
          placeholder="Burpees"
          onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
        />

        {error.quantity && (
          <p className={styles.errorMessage}>{error.quantity}</p>
        )}
        <label htmlFor="quantity">Quantity</label>
        <input
          type="text"
          id="quantity"
          placeholder="20 minutes"
          onChange={(e) =>
            setNewHabit({ ...newHabit, quantity: e.target.value })
          }
        />

        {error.days && <p className={styles.errorMessage}>{error.days}</p>}
        <fieldset className={styles.daysFieldset}>
          <legend className={styles.daysLabel}>Repeat on</legend>
          <div className={styles.weekDaySelector}>
            {daysOfWeek.map((day) => (
              <div key={day} className={styles.eachWeekDay}>
                <input
                  id={`${day}Input`}
                  type="checkbox"
                  className={styles.weekDay}
                  onChange={(e) => handleDayChange(day, e.target.checked)}
                />
                <label htmlFor={`${day}Input`}>{day}</label>
              </div>
            ))}
          </div>
        </fieldset>

        <button type="submit" className={styles.submit}>
          + Create New Habit
        </button>
      </form>
    </div>
  );
};

export default Create;
