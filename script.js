document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById("quote-text");
    const answerInput = document.getElementById("answer-input");
    const newQuoteButton = document.getElementById("new-quote-button");
    const messageElement = document.getElementById("message-return");
    let currentID;

    function getQuote() {
        if (quoteDisplay) {
            quoteDisplay.innerHTML = "";
        }

        fetch("http://localhost:3000/Quote")
            .then(response => response.json())
            .then(data => {
                if (quoteDisplay) {
                    quoteDisplay.innerHTML = data.quote;
                }
                answerInput.value = "";
                currentID = data.id;
            })
            .catch(error => console.error(error));
    }

    async function getNewQuote() {
        const quoteDisplay = document.getElementById("quote-text");
        const response = await fetch(`http://localhost:3000/quote?id=${currentID}`);
        const data = await response.json();

        quoteDisplay.innerHTML = `${data.quote}`;
        answerInput.value = "";
        currentID = data.id;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const answer = answerInput.value;
        const ID = currentID;

        fetch("http://localhost:3000/quote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ID, MovieName: answer })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    messageElement.style.color = "green";
                    messageElement.textContent = data.message;
                    messageElement.style.display = "block";
                } else {
                    messageElement.style.color = "red";
                    messageElement.textContent = data.message;
                    messageElement.style.display = "block";
                }
            })
            .catch(error => console.error(error));
    }


    newQuoteButton.addEventListener("click", () => {
        messageElement.style.display = "none";
        getNewQuote();
    });

    const answerForm = document.getElementById("answer-form");
    answerForm.addEventListener("submit", handleSubmit);

    getQuote();
});
