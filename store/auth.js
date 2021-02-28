import commonGetters from '~/helpers/getters-helper'
import commonMutations from '~/helpers/mutations-helper'

export const getters = { ...commonGetters }
export const mutations = { ...commonMutations }

export const actions = {
  SIGN_IN(commit, { email, password }) {
    return this.$auth
      .loginWith('local', {
        data: { email, password },
      })
      .then((response) => {
        const user = response.data.user
        const id = response.data.id
        this.$auth.setUser(user)
        localStorage.setItem('userId', id)
        this.$router.push({ path: '/my_orders' })
      })
  },

  SIGN_UP(commit, { name, email, phone, password, role }) {
    return this.$axios
      .post('/auth/sign-up', { name, email, phone, password, role })
      .then((response) => {
        this.$router.push({ path: '/sign-in' })
      })
  },

  RESET_PASSWORD({ email }) {
    const config = {
      headers: { Authorization: `Bearer ${this.$auth.user.token}` },
    }
    return this.$axios.$post('/user/password', config, { email })
  },
}
