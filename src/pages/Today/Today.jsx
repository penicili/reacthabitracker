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

  // Ambil jam
  // ubah jam ke pagi siang malem
  // ubah pagi siang malem ke greeting 
  // TODO: sesuain greetingnya
  const greeting = 'Good Morning'

  // TODO: pakai nama user
  const userName = 'Sigma Widodo'

  const handleToggleDone = (id) => {
    setHabits((habits) => {
      return habits.map((habit) =>
        habit.id === id
          ? { ...habit, isCompletedToday: !habit.isCompletedToday }
          : habit,
      );
    });
  };

  const handleHabitDetail = (id) =>{
    // TODO: buka halaman detail habit
    console.log(`Opening detail of habit of id ${id}`)
  }

  const handleAddHabit = () => {
    // TODO: redirect ke halaman add habit
    console.log('Redirect ke halaman add habit')
  }

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
          <p className={styles.title}>{greeting}, {userName}!</p>
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
        <button type="button" className={styles.addHabit} onClick={handleAddHabit}>
          + Add habit
        </button>
      </div>
      {habits.map((habit) => (
        <div key={habit.id} className={styles.habitContainer} style={{backgroundColor: habit.isCompletedToday ? 'hsl(0, 0%, 75%)' : '', boxShadow: habit.isCompletedToday ? '2px 2px #000' : ''}} >
          <input
            type="checkbox"
            checked={habit.isCompletedToday}
            onChange={() => handleToggleDone(habit.id)}
            className={styles.statusIcon}
          />
          <div className={styles.habitContent}>
            {habit.isCompletedToday ? <s className={styles.habitName}>{habit.name}</s> : <p className={styles.habitName}>{habit.name}</p>}
            <p className={styles.habitQuantity}>{habit.quantity}</p>
          </div>
          <div className={styles.habitAction}>
            <button onClick={() => handleHabitDetail(habit.id)} className={styles.habitDetail}>
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Today;
