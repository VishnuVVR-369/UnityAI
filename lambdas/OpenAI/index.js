const OpenAI = require("openai");
const { putItemToDynamoDb } = require("/opt/index");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async (event) => {
  const { messages, model } = event.body ? JSON.parse(event.body) : {};
  if (!messages || !model) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };
  }
  const result = await openai.chat.completions.create({
    messages: messages,
    model: model,
  });
  const response = result.choices[0].message.content;
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
