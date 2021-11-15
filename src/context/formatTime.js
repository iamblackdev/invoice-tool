export const formatTime = (vlaue) => {
  // MONTHS IN SHORT
  const shortMonths = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let humanTime;

  // GETTING CURRENT MONTHS USED FOR EVALUATION
  let currentMonth = new Date().getMonth();

  let updatedAt = new Date(vlaue);

  let updatedAtMiliseconds = Date.parse(vlaue);
  let now = new Date().getTime();
  let timestamp = updatedAtMiliseconds - now;

  // CONVER TO APOSITIVE INTIGER
  let time = Math.abs(timestamp);

  // IF THERE ARE MONTHS
  if (time > 1000 * 60 * 60 * 24 * 30) {
    let months = parseInt(time / (1000 * 60 * 60 * 24 * 30), 10);
    months = currentMonth + 1 - months;
    if (months >= 1) {
      months = shortMonths[months];
      humanTime = `${months} ${updatedAt.getDate()}`;
    } else {
      months = shortMonths[updatedAt.getMonth() + 1];
      humanTime = `${months} ${updatedAt.getDate()}, ${updatedAt.getFullYear()}`;
    }

    return humanTime;
  }

  // IF THERE ARE DAYS
  else if (time > 1000 * 60 * 60 * 24) {
    let days = parseInt(time / (1000 * 60 * 60 * 24), 10);
    days === 1 ? (days = ` yesterday`) : (days = ` ${days} days ago`);
    return days;
  }

  // IF THERE ARE HOURS
  else if (time > 1000 * 60 * 60) {
    let hours = parseInt(time / (1000 * 60 * 60), 10);
    hours === 1
      ? (hours = ` ${hours} hour ago `)
      : (hours = ` ${hours} Hours ago`);
    return hours;
  }

  // If THERE ARE MINUTES
  else if (time > 1000 * 60) {
    let minutes = parseInt(time / (1000 * 60), 10);
    minutes === 1
      ? (minutes = ` ${minutes} minute ago`)
      : (minutes = ` ${minutes} minutes ago`);
    return minutes;
  }

  // OTHER WISE USE SCONDS
  else {
    let seconds = parseInt(time / 1000, 10);
    seconds === 1
      ? (seconds = `Created now`)
      : (seconds = ` ${seconds} seconds ago`);
    return seconds;
  }
};
