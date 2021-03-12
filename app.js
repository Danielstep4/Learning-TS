"use strict";
(function () {
    // App root where i render all the html
    const app = document.getElementById('app');
    // All the templates
    const formTemp = document.getElementById('project-input');
    const projectTemp = document.getElementById('single-project');
    const listTemp = document.getElementById('project-list');
    // helpers
    const cloneContent = (element) => document.importNode(element.content, true);
    const appendNode = (node, element = app) => element.appendChild(node);
    // Clone all the templates and append them
    const formNode = cloneContent(formTemp);
    appendNode(formNode);
    const activeListNode = cloneContent(listTemp);
    const finishedListNode = cloneContent(listTemp);
    appendNode(activeListNode);
    appendNode(finishedListNode);
    //Add functionality to form
    // changing the second list to be finished list.
    const addListTitle = (element, title) => {
        const titleElement = element.querySelector('header').querySelector('h2');
        titleElement.innerText = title;
    };
    const activeList = app.querySelector('.projects');
    const finishedList = app.querySelectorAll('.projects')[1];
    // Adding id for the styling
    finishedList.id = 'finished-projects';
    // Adding titles to section headers
    addListTitle(activeList, 'Active Projects');
    addListTitle(finishedList, 'Finished Projects');
    // Handling change
    let titleInput, descInput, peopleInput;
    const handleChange = (e) => {
        const type = e.target.name;
        if (e.target) {
            const { value } = e.target;
            switch (type) {
                case 'title':
                    titleInput = value;
                    break;
                case 'description':
                    descInput = value;
                    break;
                case 'people':
                    peopleInput = value;
                    break;
                default:
                    throw new Error('Input Error');
            }
        }
    };
    const onChange = (element) => element.addEventListener('change', handleChange);
    const title = app.querySelector('#title');
    onChange(title);
    const description = app.querySelector('#description');
    onChange(description);
    const people = app.querySelector('#people');
    onChange(people);
    // Handling Submit
    const form = app.querySelector('form');
    let handleDrag = e => {
        //#TODO
        const element = e.target;
        e.dataTransfer?.setData('Text', element.id);
        const startElement = element.parentElement.parentElement;
        const endElement = (startElement.nextElementSibling || startElement.previousElementSibling);
        const startList = startElement.querySelector('ul');
        const endList = endElement.querySelector('ul');
        dragHelper(startList, endList);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { valid, msg } = checkInputs(titleInput, descInput, peopleInput);
        if (!valid)
            return flash(msg, form);
        //Creating an element
        const projectDiv = document.createElement('div');
        // Creating the project html
        const singleProject = `
        <h4>Title: ${titleInput}</h4>
        <p>Description: ${descInput}</p>
        <span>Num. of Contributors: ${peopleInput}</span>
    `;
        // Appending the project html to the element
        projectDiv.innerHTML = singleProject;
        const projectNode = cloneContent(projectTemp);
        const activeListUL = activeList.querySelector('ul');
        const li = projectNode.childNodes[1];
        li.appendChild(projectDiv);
        li.addEventListener('dragstart', handleDrag);
        appendNode(projectNode, activeListUL);
        form.reset();
        titleInput = '';
        descInput = '';
        peopleInput = 0;
    };
    form.addEventListener('submit', handleSubmit);
})();
