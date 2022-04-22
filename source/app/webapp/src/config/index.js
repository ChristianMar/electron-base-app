import createReduxStore from './redux';
import API from './api';

const services = { API };

const store = createReduxStore(services);

API.setReduxStore(store);

export { store };
