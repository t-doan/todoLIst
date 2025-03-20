interface FormElements extends HTMLFormControlsCollection{
  task: HTMLInputElement;
  dueDate: HTMLInputElement;
  dueTime: HTMLInputElement;
  details: HTMLTextAreaElement;
  subject: HTMLInputElement;
}

//Query Selectors to submit form of task
const $formSubmit = document.querySelector('#task-form');

//Event handlers
$formSubmit?.addEventListener(`submit`, handleSubmit);


//Entry task object
interface Entry {
  taskId: number;
  task: string;
  details?: string;
  dueDate: string;
  dueTime: string;
  subject?: string;
}

function handleSubmit(event: Event){
  event.preventDefault();

  const entryValues = {
  }

}
