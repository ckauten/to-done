const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

module.exports = {
  sendAiReq: async (req, res) => {
    const { prompt } = req.body; // Destructure 'prompt' from the request body
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: prompt }],
        model: 'gpt-3.5-turbo',
      });

      // Send the extracted text back to the client
      console.log(completion.choices[0].message.content);
      res.json(completion.choices[0].message.content);
    } catch (error) {
      console.error('Failed to fetch OpenAI completion:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};
