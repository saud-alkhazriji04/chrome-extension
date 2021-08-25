const divEl = document.querySelector('#div');
const inputEl = document.querySelector('#input');
const saveBtn = document.querySelector('#save-button');
const tabBtn = document.querySelector('#tab-button');
const deleteBtn = document.querySelector('#delete-button');
const ulEl = document.querySelector('#ul');

let list = [];

let getListFromStorage = JSON.parse(localStorage.getItem('list'));

if (getListFromStorage) {
    list = getListFromStorage;
    render(list);
}

tabBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        list.push(tabs[0].url);
        render(list);
        localStorage.setItem('list', JSON.stringify(list));
    })
})

saveBtn.addEventListener('click', function() {
    list.push(inputEl.value);
    render(list)
    inputEl.value= '';
    localStorage.setItem('list', JSON.stringify(list));
})

deleteBtn.addEventListener('dblclick', function() {
    localStorage.clear();
    list = [];
    render(list);
})

function render(content) {
    let appearList = '';

    for (let i = 0; i < list.length; i++) {
        appearList += `<li><a target='_blank' href='${content[i]}'> ${content[i]} <a/></li>`;
    }

    ulEl.innerHTML = appearList
}