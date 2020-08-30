import { post1 } from "./post1";
import { post2 } from "./post2";
import { post3 } from "./post3";

export const initPosts = () => {
  let posts = localStorage.getItem("posts");
  if (!posts) {
    posts = {
      lastId: 3,
      ids: [1, 2, 3],
      entities: {
        1: {
          id: 1,
          authorId: 2,
          postDate: "2020-08-30T16:31:44.164Z",
          postDescription: "Świetne miejsce do odpoczynku na łonie natury.",
          location: "Brama Krakowska, Ojcowski Park Narodowy",
          image: post1,
          reactsAmount: 2,
          reactsAuthors: [2, 3],
        },
        2: {
          id: 2,
          authorId: 2,
          postDate: "2020-08-30T16:37:48.477Z",
          postDescription:
            "Niestety nie można wejść do środka, ale i tak ładnie.",
          location: "Zamek w Ojcowie, Ojcowski Park Narodowy",
          image: post3,
          reactsAmount: 1,
          reactsAuthors: [2],
        },
        3: {
          id: 3,
          authorId: 3,
          postDate: "2020-08-30T16:42:43.271Z",
          postDescription:
            "Polecam szczególnie fanom Władcy Pierścieni, robi niesamowite wrażenie.",
          location: "Hobbiton, Nowa Zelandia",
          image: post3,
          reactsAmount: 1,
          reactsAuthors: [2],
        },
      },
    };
    localStorage.setItem("posts", JSON.stringify(posts));
  }
};

export const addToMockPosts = (data) => {
  let posts = JSON.parse(localStorage.getItem("posts"));
  const newId = posts.lastId + 1;
  posts.lastId = newId;
  posts.ids.push(newId);
  posts.entities[newId] = { id: newId, ...data };
  localStorage.setItem("posts", JSON.stringify(posts));
  return newId;
};

export const getMockPosts = () => {
  const posts = JSON.parse(localStorage.getItem("posts"));
  const { lastId, ids, entities } = posts;
  const entitiesArr = Object.values(entities);
  let newEntities = [];
  entitiesArr.map((x) => {
    newEntities.push(x);
  });
  return newEntities;
};

export const updateMockPost = (data) => {
  const { id, userId } = data;
  let posts = JSON.parse(localStorage.getItem("posts"));
  posts.entities[id].reactsAmount++;
  posts.entities[id].reactsAuthors.push(userId);
  localStorage.setItem("posts", JSON.stringify(posts));
};
