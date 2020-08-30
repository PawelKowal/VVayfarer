export const initComments = () => {
  let comments = localStorage.getItem("comments");
  if (!comments) {
    comments = {
      lastId: 4,
      ids: [1, 2, 3, 4],
      entities: {
        1: {
          id: 1,
          postId: 1,
          authorId: 3,
          commentDate: "2020-08-30T16:43:09.677Z",
          content: "Dobrze, że się te skały na Ciebie nie przewróciły xD",
          reactsAmount: 1,
          reactsAuthors: ["2"],
        },
        2: {
          id: 2,
          postId: 2,
          authorId: 3,
          commentDate: "2020-08-30T16:43:45.610Z",
          content: "Rzeczywiście słabo, że się nie da wejść do środka.",
          reactsAmount: 0,
          reactsAuthors: [],
        },
        3: {
          id: 3,
          postId: 1,
          authorId: "2",
          commentDate: "2020-08-30T16:46:20.794Z",
          content: "Byłaby ze mnie miazga :|",
          reactsAmount: 0,
          reactsAuthors: [],
        },
        4: {
          id: 4,
          postId: 3,
          authorId: "2",
          commentDate: "2020-08-30T16:46:41.843Z",
          content: "Zawsze chciałem tam pojechać :o",
          reactsAmount: 0,
          reactsAuthors: [],
        },
      },
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
