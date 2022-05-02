const input = document.querySelector("input");
const btn = document.querySelector(".btn");
const showQuotes = document.querySelector(".show-quotes");

btn.addEventListener("click", getRandomQuotes);

function getRandomQuotes() {
    fetch("https://type.fit/api/quotes")
        .then((respones) => respones.json())
        .then((data) => {
            let number = Math.floor(Math.random() * data.length);

            const resultMap = `
                <div class="quotes-box">
                    <h1 class="quote-text">
                        “${data[number].text ? data[number].text : ""}”
                    </h1>
                    <h1 class="quote-author">
                        &#9866;${data[number].author ? data[number].author : ""}
                    </h1>
                </div>
                `;
            return (showQuotes.innerHTML = resultMap);
        });
}
getRandomQuotes();

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        let author = e.target.value;
        getQuotesAuthor(author);
        e.target.value = "";
    }
});

function getQuotesAuthor(author) {
    fetch("https://type.fit/api/quotes")
        .then((respones) => respones.json())
        .then((data) => {
            let quoteItem = data
                .filter((element) => element.author === author)
                .map((item) => {
                    return `
                    <div class="quotes-box">
                        <h1 class="quote-text">
                            “${item.text ? item.text : ""}”
                        </h1>
                        <h1 class="quote-author">
                            &#9866;${item.author ? item.author : ""}
                        </h1>
                    </div>
                    `;
                })
                .join("");
            showQuotes.innerHTML = quoteItem;
        });
}
