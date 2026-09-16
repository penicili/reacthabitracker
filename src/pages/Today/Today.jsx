import styles from "./Today.module.css";
import { useState } from "react";

const Today = () => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Drink water",
      quantity: "20 minutes",
      isCompletedToday: false,
    },
    { id: 2, name: "Read", quantity: "20 minutes", isCompletedToday: false },
    {
      id: 3,
      name: "Drink Coffee",
      quantity: "20 minutes",
      isCompletedToday: false,
    },
  ]);

  const handleToggleDone = (id) => {
    setHabits((habits) => {
      return habits.map((habit) =>
        habit.id === id
          ? { ...habit, isCompletedToday: !habit.isCompletedToday }
          : habit,
      );
    });
  };

  const completedHabits = habits.filter(
    (habit) => habit.isCompletedToday,
  ).length;
  const completionPercentage = Math.round(
    (completedHabits / habits.length) * 100,
  );

  return (
    <div className={styles.today}>
      <div className={styles.todayHeader}>
        <div className={styles.greetings}>
          <p className={styles.title}>Good morning, Alex</p>
          <p className={styles.subtitle}>Today's Menu:</p>
        </div>
      </div>

      <div className={styles.habitcontainer}>
        <div className={styles.completion}>
          <div>
            <p>Today's progress</p>
            <p>
              {completedHabits} of {habits.length} habits completed
            </p>
          </div>
          <div>
            <p>{completionPercentage}%</p>
          </div>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressValue}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className={styles.habitHeader}>
        <button type="button" className={styles.addHabit}>
          + Add habit
        </button>
      </div>
      {habits.map((habit) => (
        <div key={habit.id} className={styles.habitContainer}>
          <input
            type="checkbox"
            checked={habit.isCompletedToday}
            onChange={() => handleToggleDone(habit.id)}
            className={styles.statusIcon}
          />
          <p>{habit.name}</p>
          <p>{habit.quantity}</p>
        </div>
      ))}
    </div>
  );
};
export default Today;
