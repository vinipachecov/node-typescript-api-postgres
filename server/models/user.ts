
import * as bcrypt from 'bcrypt';

export default function(sequelize, DataTypes) {
  // here the string will be the name of tha db table
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  // hashing the user password 

  User.beforeCreate((user) => {
    return hashPassword(user);
  });

  User.beforeUpdate((user) => {
    return hashPassword(user);
  });

  function hashPassword(user) {
    const salt = bcrypt.genSaltSync(10);
    user.set('password', bcrypt.hashSync(user.password, salt));
  }

  return User;
}