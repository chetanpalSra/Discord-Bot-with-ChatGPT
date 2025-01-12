require('dotenv').config();

const chatGPT_API_KEY = process.env.API_KEY;

async function sendMessageToChatGPT(prompt){

    const endpointToSendPrompt = 'https://api.openai.com/v1/chat/completions'
    ;

    const headers = {
        'Authorization': `Bearer ${chatGPT_API_KEY}`,
        'Content-Type': 'application/json',
    };

    const dataSendToGPT = {
        model: 'gpt-4o-mini',
        messages: [
            {role: 'system', content: 'You are a helpful assistant.'},
            {role: 'user', content: `${prompt}`},
        ],
        temperature: 0.7, // handles creativity of response.
        max_tokens: 150,
        store: true,
    };
    try{

        const response = await fetch(endpointToSendPrompt,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(dataSendToGPT),
        });

        if(!response.ok){
            const errorDetails = await response.json();

    
            return console.log(`chatGPT Response is:\nErrorStatus: ${response.status} and The Error is:\n ${errorDetails}`);   
        }

        const result = await response.json();

        console.log(result);

        const finalResult = result.choices[0].message.content;
    
        return finalResult;

    } catch(error){
           console.log('An Error occurred while Communicating with chatGPT',error.message);
    }

}

module.exports = {sendMessageToChatGPT};