const msFormatter = (milliSecs) => {
  let seconds = Math.floor(((milliSecs/1000) % 60)).toString()
  seconds = seconds.length == 1 ? `0${seconds}` : `${seconds}`
  let minutes = Math.floor((milliSecs/(1000*60)) % 60)
  return `${minutes}:${seconds}`
}
export default msFormatter