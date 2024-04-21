const progressBar = (duration, progress) => {
  const lengthOfTheProgressBar = 8;
  const totalParts = Math.floor(duration / lengthOfTheProgressBar);
  const completedParts = Math.floor(progress / totalParts);
  return `${'━'.repeat(completedParts)}●${'─'.repeat(
    lengthOfTheProgressBar - completedParts
  )}`;
};
export default progressBar;
