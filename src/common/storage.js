const token_key = 'token_1.0.0';
const member_nick_name_key = 'member_nick_name_1.0.0';
const member_avatar_path_key = 'member_avatar_path_1.0.0';
const wx_mp_user_key = 'wx_mp_user_1.0.0';

function getToken() {
  // let token = localStorage.getItem(token_key);
  let token = 'eyJleHBpcmVUaW1lIjoxNTYyMDUwMzIxODg5LCJ1c2VySWQiOiIxMDEwMDc1MDc5NDg5ODU1NDkxIiwib2JqZWN0SWQiOiIxMDEwMDc1MDc5NDg5ODU1NDkwIn0=';

  if (token === null || typeof (token) === 'undefined') {
    return 'eyJleHBpcmVUaW1lIjoxNTYxODcwNjUyNTU3LCJ1c2VySWQiOiIxMDEyNTg2NjE0NjQ0NzAzMjM0Iiwib2JqZWN0SWQiOiIxMDEyNTg2NjE0NjQ0NzAzMjMzIn0=';
  }

  return token;
}

function setToken(token) {
  sessionStorage.clear();
  localStorage.clear();

  localStorage.setItem(token_key, token);
}

function getMemberNickName() {
  return localStorage.getItem(member_nick_name_key);
}

function setMemberNickName(memberNickName) {
  localStorage.setItem(member_nick_name_key, memberNickName);
}

function getMemberAvatarPath() {
  return localStorage.getItem(member_avatar_path_key);
}

function setMemberAvatarPath(memberAvatarPath) {
  localStorage.setItem(member_avatar_path_key, memberAvatarPath);
}

function getWxMpUser() {
  return sessionStorage.getItem(wx_mp_user_key);
}

function setWxMpUser(wxMpUser) {
  sessionStorage.setItem(wx_mp_user_key, wxMpUser);
}

export default {
  getToken: getToken,
  setToken: setToken,
  getMemberNickName: getMemberNickName,
  setMemberNickName: setMemberNickName,
  getMemberAvatarPath: getMemberAvatarPath,
  setMemberAvatarPath: setMemberAvatarPath,
  getWxMpUser: getWxMpUser,
  setWxMpUser: setWxMpUser
};
