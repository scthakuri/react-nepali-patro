export const styles = {
  calendar: {
    width: '280px'
  },
  weekdays: {
    display: 'block',
    overflow: 'auto'
  },

  weekday: {
    width: '40px',
    float: 'left',
    'text-align': 'center',
  },
  row: {
    display: 'block',
    overflow: 'auto',
  },

  day: {
    width: '36px',
    float: 'left',
    border: '2px solid white',
    'border-radius': '2px',
    'text-align': 'center',
    cursor: 'pointer',
    'user-select': 'none',
  },

  weekend: {
    color: 'red'
  },

  dayMuted: {
    opacity: 0.5,
  },

  switch: {
    overflow: 'auto',
    width: '280px',
  },

  btns: {
    width: '25%',
    float: 'left',
    'text-align': 'center',
    cursor: 'pointer',
  },

  activeSwitch: {
    'border-bottom': '2px solid rgb(46, 192, 236)',
  },

  forwardBtn: {
    'text-align': 'right',
    'font-weight': 'bold',
  },

  backBtn: {
    'text-align': 'left',
    'font-weight': 'bold',
  },

  selectedDay: {
    border: '2px solid orange',
    'border-radius': '2px',
  },

  today: {
    background: 'rgb(255, 206, 115)',
    'border-radius': '2px',
  }
}