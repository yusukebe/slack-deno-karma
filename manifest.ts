import { Workflow } from "./src/workflow.ts";
import { Manifest } from "deno-slack-sdk/mod.ts";
import { Datastore } from "./src/datastore.ts";

export default Manifest({
  name: "karma",
  description: "Karma Bot",
  icon: "assets/icon.png",
  workflows: [Workflow],
  outgoingDomains: [],
  datastores: [Datastore],
  botScopes: [
    "app_mentions:read",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
  ],
});
