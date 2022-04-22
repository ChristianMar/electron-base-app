const STORAGE_NAME = process.env.PROJECT + '_' + process.env.BUILD_TIMESTAMP;
const STORAGE_EMAIL = process.env.PROJECT + '_MAIL';

const cleanUpLocalStorage = () => {
  let keys = Object.keys(localStorage);
  keys.forEach((e) => {
    if (e !== STORAGE_NAME && e !== STORAGE_EMAIL) {
      localStorage.removeItem(e);
    }
  });
};

const cleanUpStore = (store) => {
  return Object.keys(store)
    .filter(
      (branch) =>
        ![
          // These state branches aren't synced
          // to the local storage, as the app needs to
          // pull the data each time it loads
        ].includes(branch)
    )
    .reduce((cleaned, branch) => ({ ...cleaned, [branch]: store[branch] }), {});
};

export const syncLocalStorageMiddleware = (store) => (next) => (action) => {
  let result = next(action);
  let nextState = cleanUpStore(store.getState());
  localStorage.setItem(STORAGE_NAME, JSON.stringify(nextState));
  return result;
};

export const getLocalStorageStore = () => {
  cleanUpLocalStorage();
  let state = localStorage.getItem(STORAGE_NAME);
  if (state)
    return {
      ...JSON.parse(state),
    };
  return {};
};
