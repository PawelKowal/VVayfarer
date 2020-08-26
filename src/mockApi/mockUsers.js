import React from "react";

export const initUsers = () => {
  let users = localStorage.getItem("users");
  if (!users) {
    users = {
      lastId: 2,
      ids: [1, 2],
      entities: {
        1: {
          name: "Frodo Baggins",
          email: "test@mail.com",
          password: "Password1.",
        },
        2: {
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
  const old_users = JSON.parse(localStorage.getItem("users"));
  let users = old_users;
  //users.entities = [...old_users.entities];
  let newId = users.lastId + 1;
  users.lastId = newId;
  users.ids.push(newId);
  users.entities[newId] = data;
  localStorage.setItem("users", JSON.stringify(users));
};
