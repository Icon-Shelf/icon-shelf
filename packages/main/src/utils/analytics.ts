const ua = require("universal-analytics");
const uuid = require("uuid");
import store from "./store";

const userId = store.get("userId") || uuid.v4();

store.set("userId", userId);

function activateAnalytics() {
  const user = ua("UA-138326907-3", userId);

  user.set("platform", process.platform);

  user.pageview("/").send();

  user
    .event("user platform", "platform", "Platform OS", process.platform)
    .send();
}

export { activateAnalytics };
