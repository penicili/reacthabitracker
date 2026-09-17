/**
 * @typedef {Object} Habit
 * @property {string} id Client-generated unique identifier.
 * @property {string} name Display name of the habit.
 * @property {string} quantity Target or amount for the habit.
 * @property {string[]} days Days on which the habit repeats.
 * @property {string[]} checkIns Dates when the habit was completed.
 */

/**
 * Creates a new habit with its initial state.
 *
 * @param {Object} options
 * @param {string} options.name Display name of the habit.
 * @param {string} options.quantity Target or amount for the habit.
 * @param {string[]} [options.days=[]] Days on which the habit repeats.
 * @returns {Habit} A newly created habit.
 */
export function createHabit({ name, quantity, days = [] }) {
  return {
    id: crypto.randomUUID(),
    name,
    quantity,
    days: [...days],
    checkIns: [],
  };
}
