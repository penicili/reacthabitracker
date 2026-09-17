import { createHabit } from "../models/Habit";

const HABITS_STORAGE_KEY = "habits";

/**
 * @returns {import("../models/Habit").Habit[]}
 */
export function getHabits() {
  const storedHabits = localStorage.getItem(HABITS_STORAGE_KEY);

  if (!storedHabits) {
    return [];
  }

  try {
    return JSON.parse(storedHabits).map((habit) => ({
      ...habit,
      checkIns: Array.isArray(habit.checkIns) ? habit.checkIns : [],
    }));
  } catch {
    return [];
  }
}

/**
 * Gets a habit by its ID.
 *
 * @param {string} id Habit ID.
 * @returns {import("../models/Habit").Habit | undefined}
 */
export function getHabitById(id) {
  return getHabits().find((habit) => habit.id === id);
}

/**
 * @param {import("../models/Habit").Habit[]} habits
 */
export function saveHabits(habits) {
  localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
}

/**
 * @param {Object} options
 * @param {string} options.name
 * @param {string} options.quantity
 * @param {string[]} options.days
 * @returns {import("../models/Habit").Habit}
 */
export function addHabit(options) {
  const habit = createHabit(options);
  saveHabits([...getHabits(), habit]);
  return habit;
}
