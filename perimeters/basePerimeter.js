import { Perimeter } from 'vue-kindergarten'

export default class basePerimeter extends Perimeter {
  isUser() {
    return this.child && this.child.role === 'user'
  }

  isAdmin() {
    return this.child && this.child.role === 'admin'
  }

  isSuperAdmin() {
    return this.child && this.child.role === 'superadmin'
  }

  isPhotographer() {
    return this.child && this.child.role === 'photographer'
  }

  isDesigner() {
    return this.child && this.child.role === 'designer'
  }
}
