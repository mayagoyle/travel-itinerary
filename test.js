// // console.log('Hello world')

// function fetchFromServer(location, days) {
//     console.log(`Attempting to send a POST request to the server with location: ${location} and days: ${days}`);
//     // Construct the message to send to the OpenAI API
//     const message = {
//         model: "gpt-3.5-turbo",
//         messages: [
//             { role: "user", content: `What are fun activities for ${days} days in ${location}?` }
//         ]
//     };

//     // Fetch request to the server-side endpoint
//         fetch('/api/openai', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(message)
//         })
//         .then(response => {
//             console.log(response);  // Log the raw response
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             } else if (!response.headers.get("content-type").includes("application/json")) {
//                 throw new Error("Not a JSON response");
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data); //log result 
//             document.getElementById('result').textContent = JSON.stringify(data);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }

// fetchFromServer('paris', 4);