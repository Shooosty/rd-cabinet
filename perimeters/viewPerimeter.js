import BasePerimeter from '~/perimeters/basePerimeter'
export default new BasePerimeter({
  purpose: 'view',
  govern: {
    'can route': () => true,
    'can viewForAdmin'() {
      return this.isAdmin() || this.isSuperAdmin()
    },

    'can viewForUser'() {
      return this.isUser()
    },

    'can viewForSuperAdmin'() {
      return this.isSuperAdmin()
    },

    'can viewForEmployerAndUser'() {
      return this.isPhotographer() || this.isDesigner() || this.isUser()
    },
  },
})
