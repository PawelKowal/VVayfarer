export const createJsonPatchDoc = (data) => {
  var jsonPatchDoc = [
    {
      op: "replace",
      path: "/ProfileDescription",
      value: data.ProfileDescription,
    },
    {
      op: "replace",
      path: "/Image",
      value: data.Image,
    },
  ];
  return jsonPatchDoc;
};
