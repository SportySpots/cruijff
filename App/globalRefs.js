const refs = {};
export default refs;

export const addGlobalRef = name => (ref) => { refs[name] = ref; };
