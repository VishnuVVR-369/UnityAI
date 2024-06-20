const Anthropic = require("@anthropic-ai/sdk");
const { putItemToDynamoDb } = require("/opt/index");

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

exports.handler = async (event) => {
  const { messages, model } = event.body ? JSON.parse(event.body) : {};
  if (!messages || !model) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };
  }
  const result = await anthropic.messages.create({
    messages: messages,
    model: model,
    max_tokens: 4000,
  });
  const response = result.content[0].text;
  console.log(response);
  let res = await putItemToDynamoDb("UnityAI", {
    chatId: {
      S: "123",
    },
    createdAt: {
      N: "1717580076",
    },
    model: {
      S: model,
    },
    response: {
      S: response,
    },
  });
  console.log("Dynamo DB Result: ", res);
  return response;
};
