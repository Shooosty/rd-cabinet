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

    'can viewForPhotographer'() {
      return this.isPhotographer()
    },

    'can viewForDesigner'() {
      return this.isDesigner()
    },

    'can viewForEmployerAndUser'() {
      return this.isPhotographer() || this.isDesigner() || this.isUser()
    },

    'can viewForEmployerAndAdmins'() {
      return (
        this.isPhotographer() ||
        this.isDesigner() ||
        this.isSuperAdmin() ||
        this.isAdmin()
      )
    },

    'can viewForAll'() {
      return (
        this.isPhotographer() ||
        this.isDesigner() ||
        this.isUser() ||
        this.isSuperAdmin() ||
        this.isAdmin()
      )
    },
  },
})
