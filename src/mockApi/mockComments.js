export const initComments = () => {
  let comments = localStorage.getItem("comments");
  if (!comments) {
    comments = {
      lastId: 0,
      ids: [],
      entities: {},
    };
    localStorage.setItem("comments", JSON.stringify(comments));
  }
};

export const addToMockComments = (data) => {
  let comments = JSON.parse(localStorage.getItem("comments"));
  const newId = comments.lastId + 1;
  comments.lastId = newId;
  comments.ids.push(newId);
  comments.entities[newId] = { id: newId, ...data };
  localStorage.setItem("comments", JSON.stringify(comments));
  return newId;
};

export const getMockComments = () => {
  const comments = JSON.parse(localStorage.getItem("comments"));
  const { lastId, ids, entities } = comments;
  const entitiesArr = Object.values(entities);
  let newEntities = [];
  entitiesArr.map((x) => {
    newEntities.push(x);
  });
  return newEntities;
};

export const updateMockComment = (data) => {
  const { id, userId } = data;
  let comments = JSON.parse(localStorage.getItem("comments"));
  comments.entities[id].reactsAmount++;
  comments.entities[id].reactsAuthors.push(userId);
  localStorage.setItem("comments", JSON.stringify(comments));
};
