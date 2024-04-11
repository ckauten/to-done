const OpenAI = require('openai');
const Todo = require('../models/Todo');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

module.exports = {
  sendAiReq: async (req, res) => {
    const items = await Todo.find({ userId: req.user.id });
    //creates a varible that waits to find all todo items matching the userId
    const prompt = items.map((item) => item.todo);
    //creates a prompt variable which takes the items and parses through, only extracting the item
    console.log(prompt);
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'assistant',
            content: `Your job is to make the list of items you recieve the most efficient. You are to offer a very short suggestion on which items to tackle first. Sometimes it will be groceries, sometimes it will be tasks, etc. Split them up accordingly and organize them into their own respective areas. Here is the list: ${prompt}`,
          },
        ],
        model: 'gpt-3.5-turbo',
      });

      // res.json({ response: completion.choices[0].message.content });
      res.json({ response: completion.choices[0].message.content });
      // Send the extracted text back to the client
    } catch (error) {
      console.error('Failed to fetch OpenAI completion:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};
