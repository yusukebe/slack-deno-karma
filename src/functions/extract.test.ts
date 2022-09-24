import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import ExtractFunction from "./extract.ts";

const { createContext } = SlackFunctionTester("extract");

Deno.test("Extract function test", async () => {
  let inputs = {
    body: "<@U0LAN0Z89> foo++",
  };
  let res = await ExtractFunction(createContext({ inputs }));
  assertEquals(res.outputs?.target, "foo");
  assertEquals(res.outputs?.plus, true);

  inputs = {
    body: "<@U0LAN0Z89> bar--",
  };
  res = await ExtractFunction(createContext({ inputs }));
  assertEquals(res.outputs?.target, "bar");
  assertEquals(res.outputs?.plus, false);

  inputs = {
    body: "<@U0LAN0Z89> bar",
  };
  res = await ExtractFunction(createContext({ inputs }));
  assertEquals(res.outputs, {});
});
