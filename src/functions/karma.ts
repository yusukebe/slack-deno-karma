import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";
import { DATASTORE_NAME } from "../datastore.ts";

export const KarmaFunction = DefineFunction({
  callback_id: "karma-function",
  title: "Karma",
  source_file: "src/functions/karma.ts",
  input_parameters: {
    properties: {
      target: {
        type: Schema.types.string,
      },
      plus: {
        type: Schema.types.boolean,
      },
    },
    required: ["target", "plus"],
  },
  output_parameters: {
    properties: {
      karma: {
        type: Schema.types.number,
      },
    },
    required: ["karma"],
  },
});

export default SlackFunction(KarmaFunction, async ({ inputs, token }) => {
  const client = SlackAPI(token, {});

  const result = await client.apps.datastore.query({
    datastore: DATASTORE_NAME,
    expression: "#target = :target",
    expression_attributes: { "#target": "target" },
    expression_values: { ":target": inputs.target },
  });

  let karma = 0;

  if (result.items.length > 0) {
    const item = result["items"][0];
    karma = item["karma"] as number;
    karma = getKarma(karma, inputs.plus);
    await client.apps.datastore.put({
      datastore: DATASTORE_NAME,
      item: {
        id: item["id"],
        karma: karma,
      },
    });
  } else {
    const uuid = crypto.randomUUID();
    karma = getKarma(karma, inputs.plus);
    await client.apps.datastore.put({
      datastore: DATASTORE_NAME,
      item: {
        id: uuid,
        target: inputs.target,
        karma: karma,
      },
    });
  }

  return {
    outputs: {
      karma,
    },
  };
});

const getKarma = (karma: number, plus: boolean) => {
  return plus ? karma + 1 : karma - 1;
};
