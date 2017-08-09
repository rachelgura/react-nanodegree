const actionTypeValidator = {
  get(object, property) {
    if (object[property]) {
      return object[property];
    }

    throw new TypeError(`
      ${property} is not a valid action-type. Please make sure
      you call one of the following types: ${Object.keys(object)}
    `);
  }
};

export default function action(type) {
  return new Proxy(
    {
      REQUEST: `${type}.REQUEST`,
      SUCCESS: `${type}.SUCCESS`,
      FAILURE: `${type}.FAILURE`
    },
    actionTypeValidator
  );
}
