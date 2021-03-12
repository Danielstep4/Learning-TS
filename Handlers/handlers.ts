//Handlers 
interface CheckInputs {
    valid: boolean;
    msg: string;
}
const checkInputs = (title: string, description: string, people: number): CheckInputs => {
    let valid = false;
    let msg = '';
    console.log(people)
    // Checking if user filled the inputs.
    if(!title && !description && !people) msg = 'Please fill all the inputs.'
    else if(!title) msg = 'Please fill the title input.'
    else if(!description) msg = 'Please fill the description input.'
    else if(!people) msg = 'Please fill the people input.'
    // Checking if people is a positive integer, and max number of people is 10.
    else if(people > 10) msg = 'Max people on a project is 10.'
    // Checking if description is more than 10 chars.
    else if(description.trim().length < 10) msg = 'Please make sure the description is at least 10 chars long.'
    else {
        valid = true
    }
    return {
        valid,
        msg
    }
}
const flash = (msg: string, element: HTMLElement, time: number=2500): void => {
    const CheckFlashMsg = document.querySelector('.flash-msg') as HTMLSpanElement
    if(CheckFlashMsg) return;
    const flashMessage: HTMLSpanElement = document.createElement('span');
    flashMessage.innerText = msg
    flashMessage.classList.add('flash-msg')
    element.insertAdjacentElement('beforeend', flashMessage);
    setTimeout(() => {
        flashMessage.remove()
    }, time)
}

