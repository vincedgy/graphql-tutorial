/**
 * Mock for getUser
 * @param {M} token
 */
export const getUser = token => {
  return {
    token: token,
    authenticated: true,
    id: 12345,
    roles: ['user', 'admin']
  }
}
