
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { feeling } = req.body;

  if (!feeling || typeof feeling !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const gptResponse = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are Luméqua, a gentle AI that turns emotion into healing messages and musical experiences.' },
        { role: 'user', content: `I'm feeling: ${feeling}` },
      ],
    });

    const message = gptResponse.data.choices[0].message?.content || 'Something beautiful is on its way.';

    return res.status(200).json({
      message,
      music: 'https://example.com/music.mp3', // placeholder
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong generating the message.' });
  }
}
