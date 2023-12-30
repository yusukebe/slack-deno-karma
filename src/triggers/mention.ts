import { Trigger } from "deno-slack-api/types.ts";
import { Workflow } from "../workflow.ts";
import env from "../../env.ts";
import { TriggerTypes } from "deno-slack-api/typed-method-types/workflows/triggers/mod.ts";
import { TriggerEventTypes } from "deno-slack-api/typed-method-types/workflows/triggers/trigger-event-types.ts";

const trigger: Trigger<typeof Workflow.definition> = {
  type: TriggerTypes.Event,
  event: {
    event_type: TriggerEventTypes.AppMentioned,
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
