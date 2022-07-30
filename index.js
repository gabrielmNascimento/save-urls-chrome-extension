// Main array to store the leads
let myLeads = []

// Getting the elements from HTML
const inputText = document.getElementById("input-in")
const inputButton = document.getElementById("input-btn")
const leadsList = document.getElementById("leads-list")
const deleteButton = document.getElementById("delete-btn")
const tabButton = document.getElementById("tab-btn")

// Using local storage to keep URL'S on updates
const leadsLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// Getting the URL'S in the local storage
if( leadsLocalStorage )
{
    myLeads = leadsLocalStorage
    render(myLeads)
}

// Event for the "Save Tab" button
tabButton.addEventListener("click", function()
{
    // Get the active tab on chrome and stores in the leads array
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)

    })

})

// Event for the "Delete All" button
deleteButton.addEventListener("dblclick", function()
{
    myLeads = []
    localStorage.clear()
    render(myLeads)
})

// Event for the "Save Input" button
inputButton.addEventListener("click", function() 
{
    // Pushing the input to the leads array
    myLeads.push(inputText.value)
    inputText.value = ""

    //Saving in the local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads)
})

// Function who renders the leads list
function render(leads)
{
    let listItems = ""

    leads.forEach((e) => {
        listItems += `
                    <li> 
                        <a href="${e}" target="_blank"> ${e} </a> 
                    </li>
                    `
    })
    
    leadsList.innerHTML = listItems
}

