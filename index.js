const express = require("express");
const app = express();
const axios = require('axios');
const { readPdfFromUrl } = require("./util");
require("dotenv").config();
const openai = axios.create({
    baseURL: "https://dev-api.healthrx.co.in/sp-gw/api/openai/v1",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAPI_KEY}`,
    },
    timeout: 60000, // 30s
  });

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res)=>{
    res.send("Hi")
})

app.post("/hackrx/run", async (req, res)=>{

    
    let {documents, questions} = req.body;
    
    console.log(documents);

    try {
        let data = (await readPdfFromUrl(documents)).text;
        let answers = []

        const headers = {
            'Content-Type': 'application/json',
        };
        

        const messages = [
            { role: "system", content: `You are a helpful and precise clerk assigned to read and answer questions from a given document.

You will receive:
- A block of text (from a document)
- A list of labeled questions (e.g., "1", "2", etc.)

Your job is to:
1. Read the text carefully.
2. For each question, check if the answer is explicitly available in the text.
3. If found, answer it briefly and accurately using only the text.
4. If not found, write: "Not available in document."
5. Return the result in the following JSON format:

{
"answers": [
{ "ques": 1, "ans": "answer to question 1" },
{ "ques": 2, "ans": "answer to question 2" },
...
]
}

Do not include any text outside the JSON structure. if the question is an empty string return an empty string. Stay strictly within what the document provides. `},
            { role: "user", content: `` }
        ]
        
        for(let i =0;i<data.length;i+=50000) {

            
            if(answers.length==questions.length)
                break;
            try {
                console.log("hitting gpt");
                messages[1].content = `${data.length>=i+50000?data.substring(i, i+50000):data.substring(i)} - ${questions}`;
                
            const response = await openai.post("/chat/completions", {
                    model: "gpt-4o",
                    messages,
                    temperature: 0,
                    stop: null,
                  });
    
              await new Promise(resolve => setTimeout(resolve, 150));  
              
            console.log(response?.data?.choices);
                
              let geminiResponse = JSON.parse(response?.data?.choices[0]?.message?.content);
              console.log(geminiResponse);
            

              geminiResponse?.answers?.forEach((ans, i)=>{
                if(ans?.ans!="Not available in document.") {
                    answers.splice(Number(ans.ques), 0, ans.ans);
                    console.log(ans);
                    
                    questions[Number(ans.ques)]="";
                    console.log(questions);
                    
                }
              })
              console.log("hitting gpt");

            } catch(err) {
                console.log(err);
                
            }
        }
    
        res.json({answers: answers})

    } catch (err) {
        console.log(err);
    }
    
})

app.listen(3030, ()=>{
    console.log("Listening");
});
