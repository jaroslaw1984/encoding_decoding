// when page pass height 100vh it will scroll to bottom that user can see last encode or decode message
const smoothScrollDown = (target, duration) => {
  const select = document.getElementById(target);
  const targetPosition = select.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    let time = currentTime - startTime;
    const start = ease(time, startPosition, distance, duration);
    window.scrollTo(0, start);
    if (time < duration) requestAnimationFrame(animation);
  };

  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 2) (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};

export default smoothScrollDown;
