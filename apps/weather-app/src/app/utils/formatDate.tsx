/**
 * Returns 10;32
 * @param {time} string 10:00:00
 * @returns {string}
 */
function getShortTime(time: string) {
  return `${time.substring(0, 2).padStart(2, '0')}:${time
    .substring(3, 5)
    .padStart(2, '0')}`;
}

/**
 * Return 'Tomorrow' or 'Sat 27 Apr'
 * @param {_date} string
 * @returns {string}
 */
function getShortDay(_date: string) {
  const date = new Date(_date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow =
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();
  if (isTomorrow) return 'Tomorrow';
  return `${new Date(date).toLocaleString('default', {
    weekday: 'short',
  })}, ${new Date(date).toLocaleString('default', {
    month: 'short',
  })} ${new Date(date).getDate()}
  `;
}

export { getShortTime, getShortDay };
