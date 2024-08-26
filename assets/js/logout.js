let afkTimeout;

function resetAfkTimer() {
  clearTimeout(afkTimeout);
  afkTimeout = setTimeout(logoutUser, 3600000);
}

function logoutUser() {
  const token = localStorage.getItem('serverToken');
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (token && isAuthenticated === 'true') {
    localStorage.removeItem('serverToken');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('serverName');
    localStorage.removeItem('dropdownServerName');
    window.location.href = './';
  }
}

function initAfkDetection() {
  const events = ['keydown', 'scroll', 'click'];
  events.forEach(event => {
    window.addEventListener(event, resetAfkTimer);
  });
  resetAfkTimer();
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearTimeout(afkTimeout);
  } else {
    resetAfkTimer();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  initAfkDetection();
});