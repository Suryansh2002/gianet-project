import axios from "axios";
import type { MessageData } from "./types";

async function getData(messages: MessageData[]): Promise<MessageData> {
    const response = await axios.post(
      "https://llamatool.us.gaianet.network/v1/chat/completions",
      {
        model: "llama",
        messages: messages,
      }
    );
    return response.data.choices[0].message;
}

export async function prompt(messages: MessageData[]): Promise<MessageData> {
  let data = await getData(messages);
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    if (data && !data.content.includes("<tool_call>") && !data.content.includes("I'm sorry")) {
      return data;
    }
    console.log(`Attempt ${attempts + 1} failed. Retrying...`);
    data = await getData(messages);
    attempts++;
  }
  return data;
}

