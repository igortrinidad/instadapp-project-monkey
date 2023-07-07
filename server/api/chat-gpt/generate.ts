import { Configuration, OpenAIApi } from "openai";
import { decrypt } from '@/src/util/encryptServer'

export default defineEventHandler( async (event) => {
  
  const config = useRuntimeConfig()

  const { prompt = '', openAiApiKey = '' } = await readBody(event)

  const openAiApiKeyDecrypted = await decrypt(openAiApiKey, config.public.ENCRYPTION_KEY)

  const response = await getChatGptResponse(prompt, openAiApiKeyDecrypted)

  return {
    response,
  }

})


const getChatGptResponse = async (prompt: string, openAiApiKey: string) => {

  const openai = new OpenAIApi(new Configuration({ apiKey: openAiApiKey }))

  return openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'assistant', content: prompt }],
    max_tokens: 500,
    temperature: 0.9,
    n: 1
  })
  
  .then(response => {
    if(response.data?.choices.length && response.data?.choices[0].message.content) {
      return clearQuotes(response.data?.choices[0].message.content)
    }
    return null
  })
}

const clearQuotes = (string: string) => string.replace(/"/g, '')