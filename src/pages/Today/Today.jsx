import styles from "./Today.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getHabits, saveHabits } from "../../utils/habitStorage";

const Today = () => {
  let navigate = useNavigate();
  const [habits, setHabits] = useState(getHabits);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  const today = new Date();
  const todayKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  // TODO: pakai nama user
  // const userName = "Anon";

  const handleToggleDone = (id) => {
    setHabits((habits) => {
      const updatedHabits = habits.map((habit) => {
        if (habit.id !== id) {
          return habit;
        }

        const isCheckedIn = habit.checkIns.includes(todayKey);
        const checkIns = isCheckedIn
          ? habit.checkIns.filter((date) => date !== todayKey)
          : [...habit.checkIns, todayKey];

        return { ...habit, checkIns };
      });

      saveHabits(updatedHabits);
      return updatedHabits;
    });
  };

  const handleHabitDetail = (id) => {
    navigate(`detail/${id}`);
  };

  const handleAddHabit = () => {
    navigate("create");
    console.log("Redirect ke halaman add habit");
  };

  const completedHabits = habits.filter((habit) =>
    habit.checkIns.includes(todayKey),
  ).length;
  const completionPercentage = Math.round(
    (completedHabits / habits.length) * 100,
  );

  return (
    <div className={styles.today}>
      <div className={styles.todayHeader}>
        <div className={styles.greetings}>
          <p className={styles.title}>{greeting}!</p>
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
        <button
          type="button"
          className={styles.addHabit}
          onClick={handleAddHabit}
        >
          + Add habit
        </button>
      </div>
      {habits.map((habit) =>
        (() => {
          const isCompletedToday = habit.checkIns.includes(todayKey);

          return (
            <div
              key={habit.id}
              className={styles.habitContainer}
              style={{
                backgroundColor: isCompletedToday ? "hsl(0, 0%, 75%)" : "",
                boxShadow: isCompletedToday ? "2px 2px #000" : "",
              }}
            >
              <input
                type="checkbox"
                checked={isCompletedToday}
                onChange={() => handleToggleDone(habit.id)}
                className={styles.statusIcon}
              />
              <div className={styles.habitContent}>
                {isCompletedToday ? (
                  <s className={styles.habitName}>{habit.name}</s>
                ) : (
                  <p className={styles.habitName}>{habit.name}</p>
                )}
                <p className={styles.habitQuantity}>{habit.quantity}</p>
              </div>
              <div className={styles.habitAction}>
                <button
                  onClick={() => handleHabitDetail(habit.id)}
                  className={styles.habitDetail}
                >
                  Details
                </button>
              </div>
            </div>
          );
        })(),
      )}
    </div>
  );
};
export default Today;
