let myLeads = []
const inputBtn = document.querySelector("#input-btn")
const inputEl = document.querySelector("#input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsfromLocal = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("save-btn")

if (leadsfromLocal){
    myLeads = leadsfromLocal
    render(myLeads)
}

tabBtn.addEventListener('click',function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)        
    })    
})

function render(leads) {
    let listitems = ""
for (let i=0; i<leads.length;i++){
    // ulEl.innerHTML += "<li>"+ myLeads[i] +"</li>"
    listitems+=`
    <li>
     <a target='_blank' href='${leads[i]}'>
     ${leads[i]}
     </a>
    </li>`
    // const li = document.createElement("li")
    // li.textContent=myLeads[i]
    // ulEl.append(li)
}
ulEl.innerHTML = listitems

}

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click",function(){
myLeads.push(inputEl.value)
inputEl.value=""
localStorage.setItem("myLeads",JSON.stringify(myLeads))
render(myLeads)
})


