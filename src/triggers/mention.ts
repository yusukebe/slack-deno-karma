import { Trigger } from "deno-slack-api/types.ts";
import { Workflow } from "../workflow.ts";
import env from "../../env.ts";

const trigger: Trigger<typeof Workflow.definition> = {
  type: "event",
  event: {
    event_type: "slack#/events/app_mentioned",
    channel_ids: [`${env.CHANNEL_ID}`], // TODO: Should use environment variables etc.
  },
  name: "Mention trigger",
  workflow: "#/workflows/karma",
  "inputs": {
    "text": {
      value: "{{data.text}}",
    },
    "userId": {
      value: "{{data.user_id}}",
    },
    "channelId": {
      value: "{{data.channel_id}}",
    },
  },
};

export default trigger;
