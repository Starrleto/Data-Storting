import { data } from "./getData.js";
let currentData;

const asc = document.getElementById("asc");
const desc = document.getElementById("desc");
let descending = true;

asc.addEventListener('click', () => {
    descending = true;
    getPages(currentData);
    asc.className = "btn btn-primary";
    desc.className = "btn btn-info";
})
desc.addEventListener('click', () => {
    descending = false;
    getPages(currentData);
    desc.className = "btn btn-primary";
    asc.className = "btn btn-info";
})

const sortID = document.getElementById("sortID");
const sortFirst = document.getElementById("sortFirst");
const sortLast = document.getElementById("sortLast");
const sortAge = document.getElementById("sortAge");
const sortHeight = document.getElementById("sortHeight");

const numberButtons = []
numberButtons.push(document.getElementById("10"));
numberButtons.push(document.getElementById("20"));
numberButtons.push(document.getElementById("30"));
numberButtons.push(document.getElementById("40"));
numberButtons.push(document.getElementById("50"));
let shownNum = 50;

assignNumberButtons();
start();

sortID.addEventListener('click', async () => {
    currentData = currentData.sort((a, b) => a.Id - b.Id);
    radioBtns(sortID);
    getPages(currentData);
});
sortAge.addEventListener('click', async () => {
    currentData = currentData.sort((a, b) => a.Age - b.Age);
    radioBtns(sortAge);
    getPages(currentData);
});
sortFirst.addEventListener('click', async () => {
    currentData = currentData.sort((a, b) => a.FirstName.charCodeAt(0) - b.FirstName.charCodeAt(0));
    radioBtns(sortFirst);
    getPages(currentData);
});
sortLast.addEventListener('click', async () => {
    currentData = currentData.sort((a, b) => a.LastName.charCodeAt(0) - b.LastName.charCodeAt(0));
    radioBtns(sortLast);
    getPages(currentData);
});
sortHeight.addEventListener('click', async () => {
    currentData = currentData.sort((a, b) => parseInt(a.Height.split(' ')[0]) - parseInt(b.Height.split(' ')[0]));
    radioBtns(sortHeight);
    getPages(currentData);
});

async function start(){
    currentData = await data();
    getPages(currentData);
    radioBtns(sortID);
}

const linkContainer = document.getElementById("linkContainer");
const pageContainer = document.getElementById("pageContainer");

function getPages(array){
    let a = array.slice(0, array.length);
    if(!descending)
    a.reverse();

    let arrayPages = splitArray(a)
    populatePage(arrayPages[0]);

    linkContainer.innerHTML = '';
    for(let i = 0; i < arrayPages.length; i++){
        const li = document.createElement("li");
        li.className = "page-item";
        linkContainer.appendChild(li);

        const a = document.createElement("a");
        a.className = "page-link";
        a.innerText = i+1;
        li.appendChild(a);

        li.addEventListener('click', function(e){
            populatePage(arrayPages[i]);
        })
    }
}

function populatePage(array){

    pageContainer.innerHTML = '';
    array.forEach(element => {
        const div = document.createElement("div");
        pageContainer.appendChild(div);

        const h = document.createElement("h4");
        h.innerText = element.FirstName + " " + element.LastName;
        div.appendChild(h); 

        const p = document.createElement("p");
        p.innerText = "Email: "+element.Email;
        div.appendChild(p);
        const p1 = document.createElement("p");
        p1.innerText = "ID: "+element.Id;
        div.appendChild(p1);
        const p2 = document.createElement("p");
        p2.innerText = "Height: "+element.Height;
        div.appendChild(p2);
        const p3 = document.createElement("p");
        p3.innerText = "Age: "+element.Age;
        div.appendChild(p3);

        div.appendChild(document.createElement("hr"));
    });
}

function splitArray(array){
    let newArray = [];

    for(let i = 0; i < array.length; i+=shownNum){
        if(i+shownNum > array.length){
            newArray.push(array.slice(i, array.length));
            break;
        }
        else{
            newArray.push(array.slice(i, i+shownNum));
        }
    }
    return newArray;
}

function assignNumberButtons(){
    numberButtons.forEach(element => {
        element.addEventListener('click', () => {
            shownNum = parseInt(element.id);
            getPages(currentData);

            numberButtons.forEach(e => {
                e.className = "btn btn-info";
            })
            element.className = "btn btn-primary";
        })
    })
}

function radioBtns(item){
    sortID.className = "btn btn-info";
    sortAge.className = "btn btn-info";
    sortHeight.className = "btn btn-info";
    sortFirst.className = "btn btn-info";
    sortLast.className = "btn btn-info";
    item.className = "btn btn-primary";
}