import React from "react";

let lastId = 2;

let users = [
  {
    userId: 1,
    name: "Frodo Baggins",
    email: "test@mail.com",
    password: "Password1.",
  },
  {
    userId: 2,
    name: "Samwise Gamgee",
    email: "test2@mail.com",
    password: "Password2.",
  },
];

export const loginRequest = (email, password) => {
  let status = "";
  let userId_ = 0;
  users.map((x) => {
    if (x["email"] === email && x["password"] === password) {
      status = "ok";
      userId_ = x["userId"];
    }
  });
  return status === "ok"
    ? { token: status, userId: userId_ }
    : { token: "invalid", userId: 0 };
};

export const registrationRequest = (name_, email_, password_) => {
  lastId = ++lastId;
  users.push({
    userId: lastId,
    name: name_,
    email: email_,
    password: password_,
  });
};
