console.log("DOM Content Loaded and event listeners attached");

document.addEventListener('DOMContentLoaded', () => {
    console.log("Document is ready");
    
    const submitBtn = document.getElementById('submit');
    if (submitBtn) {
        submitBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevents the default form submission behavior
            console.log("Submit button was clicked");
            const location = document.getElementById('location').value;
            const days = document.getElementById('days').value;
            console.log(`Fetching from server with location: ${location} and days: ${days}`);
            fetchFromServer(location, days);
        });
    } else {
        console.error("Submit button not found!");
    }
});

function fetchFromServer(location, days) {
    console.log(`Attempting to send a POST request to the server with location: ${location} and days: ${days}`);
    // Construct the message to send to the OpenAI API
    const message = {
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: `What are fun activities for ${days} days in ${location}?` }
        ]
    };

    // Fetch request to the server-side endpoint
        fetch('/api/openai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        })
        .then(response => {
            console.log(response);  // Log the raw response
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else if (!response.headers.get("content-type").includes("application/json")) {
                throw new Error("Not a JSON response");
            }
            return response.json();
        })
        .then(data => {
            console.log(data); //log result 
            document.getElementById('result').textContent = JSON.stringify(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
  
// function sendQuery() {
//     const location = document.getElementById('location').value;
//     const days = document.getElementById('days').value;

//     const question = `Can you please create an itinerary for ${days} days in ${location}?`;

//     openai.chat.completions.create({ 
//         model: "gpt-3.5-turbo",
//         messages: [
//             { role: "user", content: question }
//         ]
//     }).then(res => {
//         console.log(res);
//         res.choices.forEach(out => console.log(out.message));
//     }).catch(err => {
//         console.error('Error:', err);
//     });
// }


  // document.getElementById("itineraryForm").addEventListener("submit", function(event) {
  //   event.preventDefault(); // Prevent the form from submitting in the traditional way
  
  //   // Retrieve the values from the input fields
  //   var location = document.getElementById("location").value;
  //   var days = document.getElementById("numDays").value;
  
  //   // Log the data to the console (or store it as needed)
  //   console.log("Location: " + location);
  //   console.log("Number of Days: " + days);
  // })