
(function() {
// App root where i render all the html
const app = document.getElementById('app')! as HTMLDivElement;
// All the templates
const formTemp = document.getElementById('project-input')! as HTMLTemplateElement;
const projectTemp = document.getElementById('single-project')! as HTMLTemplateElement;
const listTemp = document.getElementById('project-list')! as HTMLTemplateElement;
// helpers
const cloneContent = (element: HTMLTemplateElement) => document.importNode(element.content, true)
const appendNode = (node: DocumentFragment, element: HTMLElement=app) => element.appendChild(node) 
// Clone all the templates and append them
const formNode = cloneContent(formTemp);
appendNode(formNode);
const activeListNode = cloneContent(listTemp);
const finishedListNode = cloneContent(listTemp);
appendNode(activeListNode);
appendNode(finishedListNode);
//Add functionality to form
// changing the second list to be finished list.
const addListTitle = (element: HTMLTableSectionElement, title: string) => {
    const titleElement: HTMLElement = element.querySelector('header')?.querySelector('h2')!;
    titleElement.innerText = title
}
const activeList = app.querySelector('.projects')! as HTMLTableSectionElement;
const finishedList = app.querySelectorAll('.projects')[1]! as HTMLTableSectionElement;
// Adding id for the styling
finishedList.id = 'finished-projects'
// Adding titles to section headers
addListTitle(activeList, 'Active Projects');
addListTitle(finishedList, 'Finished Projects');
// Handling change
let titleInput:string, descInput: string, peopleInput: number;
const handleChange = (e: any): void => {
    const type: string = e.target.name 
    if(e.target) {
        const { value } = e.target
        switch(type) {
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
                throw new Error('Input Error')
        }
    }
}
const onChange = (element: HTMLInputElement): void => element.addEventListener('change', handleChange) 
const title = app.querySelector('#title')! as HTMLInputElement
onChange(title)
const description = app.querySelector('#description')! as HTMLInputElement
onChange(description)
const people = app.querySelector('#people')! as HTMLInputElement
onChange(people)
// Handling Submit
const form = app.querySelector('form')! as HTMLFormElement;
let handleDrag: (e: Event) => void = e => {
    //#TODO
    return;
}
const handleSubmit = (e: Event): void | undefined => {
    e.preventDefault();
    const { valid , msg } = checkInputs(titleInput, descInput, peopleInput)
    if(!valid) return flash(msg, form);
    //Creating an element
    const projectDiv = document.createElement('div');
    // Creating the project html
    const singleProject: string = `
        <h4>Title: ${titleInput}</h4>
        <p>Description: ${descInput}</p>
        <span>Num. of Contributors: ${peopleInput}</span>
    `
    // Appending the project html to the element
    projectDiv.innerHTML = singleProject;
    const projectNode = cloneContent(projectTemp);
    const activeListUL = activeList.querySelector('ul')! as HTMLUListElement;
    const li = projectNode.childNodes[1] as HTMLLIElement;
    li.appendChild(projectDiv)
    li.addEventListener('drag', handleDrag)
    appendNode(projectNode, activeListUL)
    form.reset()
    titleInput = '';
    descInput = '';
    peopleInput = 0;
}
form.addEventListener('submit', handleSubmit)
})()