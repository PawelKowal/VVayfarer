export const initUsers = () => {
  let users = localStorage.getItem("users");
  if (!users) {
    users = {
      lastId: 2,
      ids: [1, 2],
      entities: {
        1: {
          id: 1,
          name: "Frodo Baggins",
          email: "test@mail.com",
          password: "Password1.",
        },
        2: {
          id: 2,
          name: "Samwise Gamgee",
          email: "test2@mail.com",
          password: "Password2.",
        },
      },
    };
    users = JSON.stringify(users);
    localStorage.setItem("users", users);
  }
};

export const loginRequest = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users"));
  let token_ = "invalid";
  let userId_ = 0;
  users.ids.map((x) => {
    if (
      users.entities[x]["email"] === email &&
      users.entities[x]["password"] === password
    ) {
      token_ = "ok";
      userId_ = x;
    }
  });
  return { token: token_, userId: userId_ };
};

export const registrationRequest = (data) => {
  let users = JSON.parse(localStorage.getItem("users"));
  let newId = users.lastId + 1;
  users.lastId = newId;
  users.ids.push(newId);
  users.entities[newId] = { id: newId, ...data };
  localStorage.setItem("users", JSON.stringify(users));
  return newId;
};

export const getUsersMockData = () => {
  const users = JSON.parse(localStorage.getItem("users"));
  const { lastId, ids, entities } = users;
  const entitiesArr = Object.values(entities);
  let newEntities = [];
  entitiesArr.map((x) => {
    newEntities.push({ id: x.id, name: x.name });
  });
  return newEntities;
};

export const updateMockUser = (id, profileDescription, image) => {
  let users = JSON.parse(localStorage.getItem("users"));
  users.entities[id]["image"] = image;
  users.entities[id]["profileDescription"] = profileDescription;
  localStorage.setItem("users", JSON.stringify(users));
};
