// User model
class User {
  constructor({
    id,
    username,
    email,
    hashed_password,
    is_active,
    role,
    last_login,
    profile_picture,
    phone_number,
    updated_at,
    created_at
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.hashed_password = hashed_password;
    this.is_active = is_active;
    this.role = role;
    this.last_login = last_login;
    this.profile_picture = profile_picture;
    this.phone_number = phone_number;
    this.updated_at = updated_at;
    this.created_at = created_at;
  }
}

module.exports = User;
