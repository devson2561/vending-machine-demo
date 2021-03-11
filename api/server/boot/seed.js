'use strict';
const roles = ['ADMIN', 'USER'];

const admin = {
  username: 'admin',
  email: 'admin@vdm.com',
  password: 'password',
  emailVerified: true,
  role: 'ADMIN',
};

module.exports = async (app) => {
  const User = app.models.UserAccount;
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;
  async function createRole() {
    try {
      let results = await Promise.all(
        roles.map(async (role) => {
          let [model, created] = await Role.findOrCreate(
            {
              where: {
                name: role,
              },
            },
            {
              name: role,
            }
          );
          return model;
        })
      );
      return Promise.resolve(results);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async function createAdmin() {
    try {
      let [model, created] = await User.findOrCreate(
        {
          where: {
            username: admin.username,
          },
        },
        admin
      );
      return Promise.resolve({ model, created });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async function assignRole(user, role) {
    try {
      let roleMapping = await role.principals.findOne({
        where: {
          principalType: RoleMapping.USER,
          principalId: user.id,
          roleId: role.id,
        },
      });
      if (!roleMapping) {
        roleMapping = await role.principals.create({
          principalType: RoleMapping.USER,
          principalId: user.id,
        });
      }
      return Promise.resolve(roleMapping);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  try {
    var _roles = await createRole();
    var { model: _adminUser, created: _isAdminCreated } = await createAdmin();
    var _adminRole = _roles.find((role) => {
      return role.name === 'ADMIN';
    });
    await assignRole(_adminUser, _adminRole);
  } catch (e) {
    throw e;
  }
};
