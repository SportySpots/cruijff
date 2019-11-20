import AsyncStorage from "@react-native-community/async-storage";
import { autorun } from "mobx";

export const persist = async (obj, asyncKey) => {
  const as = await AsyncStorage.getItem(asyncKey);
  if (as) {
    const parsed = JSON.parse(as);
    Object.keys(parsed).forEach(key => {
      obj[key] = parsed[key];
    });
    console.log('restored', parsed);
  }
  autorun(() => {
    const keys = Object.keys(obj.__proto__);
    const toSave = {};
    keys.forEach(key => {
      toSave[key] = obj[key];
    });
    AsyncStorage.setItem(asyncKey, JSON.stringify(toSave));
  });
}

export const copyProperties = (objFrom, objTo) => {
  const keys = Object.keys(objFrom.__proto__);
  keys.forEach(key => {
    console.log(key, typeof objTo[key]);
    objTo[key] = objFrom[key];
  });
}
