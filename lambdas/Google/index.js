const { GoogleGenerativeAI } = require("@google/generative-ai");
const { putItemToDynamoDb } = require("/opt/index");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

exports.handler = async (event) => {
  const { messages, model, prompt } = event.body ? JSON.parse(event.body) : {};
  if (!messages || !model || !prompt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };
  }
  const generativeModel = genAI.getGenerativeModel({ model: model });
  const chat = generativeModel.startChat({
    history: messages,
    generationConfig: {
      maxOutputTokens: 5000,
    },
  });
  const result = await chat.sendMessage(prompt);
  const response = result.response.text();
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
