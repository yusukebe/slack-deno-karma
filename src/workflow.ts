import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ExtractFunction } from "./functions/extract.ts";
import { KarmaFunction } from "./functions/karma.ts";

export const Workflow = DefineWorkflow({
  callback_id: "karma",
  title: "Karma Workflow",
  input_parameters: {
    properties: {
      text: {
        type: Schema.types.string,
      },
      userId: {
        type: Schema.slack.types.user_id,
      },
      channelId: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["text", "userId", "channelId"],
  },
});

const extractStep = Workflow.addStep(ExtractFunction, {
  body: Workflow.inputs.text,
});

const karmaStep = Workflow.addStep(KarmaFunction, {
  target: extractStep.outputs.target,
  plus: extractStep.outputs.plus,
});

Workflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: Workflow.inputs.channelId,
  message: `${extractStep.outputs.target}: ${karmaStep.outputs.karma}`,
});

export default Workflow;
