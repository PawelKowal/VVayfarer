export const initPosts = () => {
  let posts = localStorage.getItem("posts");
  if (!posts) {
    posts = {
      lastId: 0,
      ids: [],
      entities: {},
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
