import RestaurantService from "./restaurant";
import ItemService from "./item";

const singleton = Symbol();
const singletonEnforcer = Symbol();

class ServiceContext {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("Cannot construct RestService Facade more than one");
    }
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ServiceContext(singletonEnforcer);
    }
    return this[singleton];
  }

  get restaurantService() {
    return RestaurantService.instance;
  }

  get itemService() {
    return ItemService.instance;
  }
}

export default ({ Vue }) => {
  Vue.prototype.$serviceContext = ServiceContext.instance;
};
