import { useState } from "react";
import { getHabits } from "../../utils/habitStorage";
import styles from "./Stats.module.css";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const formatDateKey = (date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

const getLastSevenDays = () => {
  const today = new Date();

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setHours(0, 0, 0, 0);
    date.setDate(today.getDate() - (6 - index));

    return {
      key: formatDateKey(date),
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayName: dayNames[date.getDay()],
    };
  });
};

const Stats = () => {
  const [habits] = useState(getHabits);
  const week = getLastSevenDays();
  const scheduledCount = week.reduce(
    (total, date) =>
      total +
      habits.filter((habit) => habit.days.includes(date.dayName)).length,
    0,
  );
  const completedCount = week.reduce(
    (total, date) =>
      total +
      habits.filter((habit) => habit.checkIns.includes(date.key)).length,
    0,
  );
  const completionRate = scheduledCount
    ? Math.round((completedCount / scheduledCount) * 100)
    : 0;
  const totalCheckIns = habits.reduce(
    (total, habit) => total + habit.checkIns.length,
    0,
  );
  const bestHabit = habits.reduce(
    (best, habit) =>
      !best || habit.checkIns.length > best.checkIns.length ? habit : best,
    null,
  );
  const maxDailyCount = Math.max(
    1,
    ...week.map(
      (date) =>
        habits.filter((habit) => habit.checkIns.includes(date.key)).length,
    ),
  );

  return (
    <main className={styles.stats}>
      <header className={styles.statsHeader}>
        <p className={styles.eyebrow}>Look back</p>
        <h1>Progress report</h1>
        <p>Seven days of showing up, one check-in at a time.</p>
      </header>

      <section className={styles.summaryGrid} aria-label="Habit summary">
        <article className={styles.summaryCard}>
          <span>Total habits</span>
          <strong>{habits.length}</strong>
        </article>
        <article className={styles.summaryCard}>
          <span>Total check-ins</span>
          <strong>{totalCheckIns}</strong>
        </article>
        <article className={styles.summaryCard}>
          <span>Weekly completion</span>
          <strong>{completionRate}%</strong>
        </article>
      </section>

      {habits.length === 0 ? (
        <section className={styles.emptyState}>
          <h2>No stats yet</h2>
          <p>Create a habit and start checking in to see your progress here.</p>
        </section>
      ) : (
        <>
          <section className={styles.panel}>
            <div className={styles.panelHeading}>
              <div>
                <p className={styles.eyebrow}>This week</p>
                <h2>Activity</h2>
              </div>
              <strong>{completedCount} check-ins</strong>
            </div>
            <div className={styles.chart}>
              {week.map((date) => {
                const count = habits.filter((habit) =>
                  habit.checkIns.includes(date.key),
                ).length;
                const height = `${Math.max((count / maxDailyCount) * 100, count ? 12 : 0)}%`;

                return (
                  <div className={styles.chartColumn} key={date.key}>
                    <span className={styles.chartCount}>{count || ""}</span>
                    <div className={styles.chartTrack}>
                      <div className={styles.chartBar} style={{ height }} />
                    </div>
                    <span>{date.label}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeading}>
              <div>
                <p className={styles.eyebrow}>Your habits</p>
                <h2>Performance</h2>
              </div>
              {bestHabit && <strong>Best: {bestHabit.name}</strong>}
            </div>
            <div className={styles.habitList}>
              {[...habits]
                .sort((a, b) => b.checkIns.length - a.checkIns.length)
                .map((habit) => (
                  <div className={styles.habitRow} key={habit.id}>
                    <span>{habit.name}</span>
                    <strong>{habit.checkIns.length} check-ins</strong>
                  </div>
                ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Stats;
