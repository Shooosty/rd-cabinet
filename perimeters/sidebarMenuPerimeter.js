import BasePerimeter from '~/perimeters/basePerimeter'
export default new BasePerimeter({
  purpose: 'sidebarMenu',
  govern: {
    'can route': () => true,
    'can viewSidebarMenuItemForAdmin'() {
      return this.isAdmin() || this.isSuperAdmin()
    },
    'can viewSidebarMenuItemForUser'() {
      return this.isUser()
    },
    'can viewSidebarMenuItemForSuperAdmin'() {
      return this.isSuperAdmin()
    },
  },
})
