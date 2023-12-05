import { Configuration, OpenAIApi } from "openai";

export default defineEventHandler(async (event) => {

  setResponseHeaders(event, {
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Origin": "https://127.0.0.1:3000,https://project-monkey-prompt-generator.vercel.app/",
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Headers": '*',
    "Access-Control-Expose-Headers": '*'
  })

  const { prompt = '' } = await readBody(event)

  const response = await getChatGptResponse(prompt)

  return {
    response,
  }

})


const getChatGptResponse = async (prompt: string) => {

  const config = useRuntimeConfig()
  const OPEN_AI_KEY = config.OPEN_AI_KEY

  const openai = new OpenAIApi(new Configuration({ apiKey: OPEN_AI_KEY }))

  return openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'assistant', content: prompt }],
    max_tokens: 500,
    temperature: 0.9,
    n: 1
  })

    .then(response => {
      if (response.data?.choices.length && response.data?.choices[0].message.content) {
        return clearQuotes(response.data?.choices[0].message.content)
      }
      return null
    })
}

const clearQuotes = (string: string) => string.replace(/"/g, '')