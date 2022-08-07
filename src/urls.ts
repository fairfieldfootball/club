export default {
  welcome: '/welcome',
  home: '/',
  profile: '/profile',

  me: '/me',
  admin: '/admin',

  archive: {
    home: '/archive',

    managers: {
      list: '/archive/managers',
      view: (id: string) => `/archive/managers/${id}`,
      edit: (id: string) => `/archive/managers/${id}/edit`,
    },

    seasons: {
      list: '/archive/seasons',
      view: (id: string) => `/archive/seasons/${id}`,
      edit: (id: string) => `/archive/seasons/${id}/edit`,
    },
  },

  blogs: {
    list: '/blogs',
    new: '/blogs/new',
    view: (blogId = ':blogId') => `/blogs/${blogId}`,
    edit: (blogId = ':blogId') => `/blogs/${blogId}/edit`,
  },

  constitution: '/constitution',

  login: '/login',
  register: '/register',
  confirmEmail: '/confirm_email',
  resetPassword: '/reset_password',
  confirmation: '/confirmation',
  passwordReset: '/password_reset',
};
