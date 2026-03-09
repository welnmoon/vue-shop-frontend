export const userApi = {
  login: {
    url: () => 'auth/login',
  },
  register: {
    url: () => 'auth/register',
  },
  getCurrentUser: {
    url: () => 'auth/me',
  },
  logout: {
    url: () => 'auth/logout',
  },
}
