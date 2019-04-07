const safeStringify = (obj) => {
  try {
    return JSON.stringify(obj);
  } catch (exc) {
    return '[Unserializable object]';
  }
};

export default safeStringify;
