export function setAttributesFromString(attributes: undefined | string): {
  id?: string;
  classNames?: string[];
} {
  if (attributes == undefined) return {};
  const matchId = attributes.match(/#[_a-zA-Z0-9]+/g);
  const matchClass = attributes.match(/\.[_\/a-zA-Z0-9]+/g);

  let id: string | undefined;
  let classNames: string[] | undefined;
  if (matchId) {
    id = matchId[0] + "";
  }
  if (matchClass) {
    classNames = matchClass[0].replace(".", "").split("/");
  }
  return { id, classNames };
}
