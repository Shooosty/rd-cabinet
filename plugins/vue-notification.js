import Vue from 'vue'
import VueNotification from '@kugatsu/vuenotification'

Vue.use(VueNotification, {
  success: {
    background: '#00908c',
    color: 'white',
  },

  dark: {
    background: '#33333c',
    color: 'white',
  },

  error: {
    background: '#ff2c61',
    color: 'white',
  },
})
