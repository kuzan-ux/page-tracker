// setting values

let myPage = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const pageFromLocalStorage = JSON.parse( localStorage.getItem("myPage") )

// checking localstorage
if (pageFromLocalStorage) {
    myPage = pageFromLocalStorage
    render(myPage)
}

// tab btn function
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myPage.push(tabs[0].url)
        localStorage.setItem( "myPage", JSON.stringify(myPage) )
        render(myPage)
    })
})
localStorage.clear()

// adding weblinks in page
function render(page) {
    let listItem = ""
    for (let i = 0; i < page.length; i++) {
        listItem += `
            <li> 
                <a target='_blank' href='${page[i]}'>
                    ${page[i]}
                </a>
            </li>`
    }
    ulEl.innerHTML = listItem;
}

// delete btn function
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myPage = []
    render(myPage)
})

// input btn function
inputBtn.addEventListener("click", function() {
    myPage.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myPage", JSON.stringify(myPage))
    render(myPage)
})




