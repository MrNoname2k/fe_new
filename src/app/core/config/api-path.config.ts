export const ApiPathConfig = {
  auth: {
    login: '/v1/api/auth/login',
    register: '/v1/api/auth/register',
    // register: '/users/register',
    logout: '/v1/api/auth/logout',
    changePassword: '/v1/api/auth/change-password',
    confirmChange: '/v1/api/auth/change-password/confirm',
    forgotPassword: '/v1/api/auth/forgot-password',
    confirmForgotPassword: '/v1/api/auth/forgot-password/confirm',
    checkCode: '/v1/api/auth/check-code',

  },

  post: {
    createPost: '/v1/api/posts/create-post',
    getPostFriends: '/v1/api/posts/allPostOfFriends',
    getPostImage: '/v1/api/files/read-image',
    createAvatar: '/v1/api/posts/create-avatar',
    updateAvatar: '/v1/api/posts/update-avatar',
    updateBanner: '/v1/api/posts/update-banner',
    createBanner: '/v1/api/posts/create-banner',
  },

  page: {
    home: '/v1/api/ago/home',
    about: 'v1/api/pages/about',
    photos: 'v1/api/pages/photos',
    friends: 'v1/api/pages/friends',
  },

  like: {
    likePost: '/v1/api/likes/like-or-unlike',
  },

  comment: {
    commentPost: '/v1/api/comments/create-comment',
    deleteComment: '/v1/api/comments/delete-comment',
    updateComment: '/v1/api/comments/update-comment',
  },

  users: {
    getUser: '/v1/api/users',
    updateUser: '/v1/api/users/update-user',
  },

  notification: {
    updateStatus: '/v1/api/notification/update-status',
  },
  profile: {
    myPost: '/v1/api/ago/profile/my-post',
    myAbout: '/v1/api/ago/profile/about',
  },
  relationship: {
    addFriend: '/v1/api/relationships/friend',
    unFriend: '/v1/api/relationships/unFriend',
  },
  message: {
    updateStatus: '/message/update-status',
  },
};
