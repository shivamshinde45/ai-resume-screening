
const { Worker } = require('bullmq');
const fs = require('fs');
const pdf = require('pdf-parse');
const OpenAI = require('openai');

const client = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

new Worker('eval', async job=>{
  const data = await pdf(fs.readFileSync(job.data.path));
  const prompt = fs.readFileSync('src/prompts/resume.txt','utf-8');

  await client.chat.completions.create({
    model:"gpt-4o-mini",
    messages:[
      {role:"system",content:prompt},
      {role:"user",content:data.text}
    ]
  });
});
