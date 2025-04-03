import { addEntry, getEntries, deleteEntry, type Entry } from "./data.js";

// DOM Elements
const $form = document.querySelector("#task-form") as HTMLFormElement;
const $taskList = document.querySelector("#task-list") as HTMLUListElement;
const $taskName = document.querySelector("#task-name") as HTMLInputElement;
const $dueDate = document.querySelector("#due-date") as HTMLInputElement;
const $dueTime = document.querySelector("#due-time") as HTMLInputElement;
const $taskDetails = document.querySelector(
  "#task-details"
) as HTMLInputElement;

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();

  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0];
  $dueDate.min = today;
});

// Form submission handler
$form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newEntry: Omit<Entry, "taskId"> = {
    task: $taskName.value.trim(),
    dueDate: $dueDate.value,
    dueTime: $dueTime.value,
    details: $taskDetails.value.trim() || undefined,
  };

  if (!newEntry.task) {
    alert("Task name is required");
    return;
  }

  addEntry(newEntry);
  renderTasks();
  $form.reset();
});

// Render all tasks
function renderTasks(): void {
  $taskList.innerHTML = "";
  const entries = getEntries();

  if (entries.length === 0) {
    $taskList.innerHTML =
      '<li class="empty-message">No tasks yet. Add one above!</li>';
    return;
  }

  entries.sort((a, b) => {
    const dateA = new Date(`${a.dueDate}T${a.dueTime}`);
    const dateB = new Date(`${b.dueDate}T${b.dueTime}`);
    return dateA.getTime() - dateB.getTime();
  });

  entries.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.dataset.taskId = entry.taskId.toString();

    const isPastDue = isTaskPastDue(entry.dueDate, entry.dueTime);

    li.innerHTML = `
      <div class="task-content">
        <div class="task-main">
          <h3 class="${isPastDue ? "past-due" : ""}">${entry.task}</h3>
          <div class="task-due">
            <span class="due-date">${formatDate(entry.dueDate)}</span>
            <span class="due-time">${formatTime(entry.dueTime)}</span>
            ${isPastDue ? '<span class="past-due-label">(Past Due)</span>' : ""}
          </div>
        </div>
        ${entry.details ? `<p class="task-details">${entry.details}</p>` : ""}
      </div>
      <button class="delete-btn" aria-label="Delete task">×</button>
    `;

    const deleteBtn = li.querySelector(".delete-btn") as HTMLButtonElement;
    deleteBtn.addEventListener("click", () => {
      deleteEntry(entry.taskId);
      renderTasks();
    });

    $taskList.appendChild(li);
  });
}

// Helper functions
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes.padStart(2, "0")} ${ampm}`;
}

function isTaskPastDue(dueDate: string, dueTime: string): boolean {
  const now = new Date();
  const dueDateTime = new Date(`${dueDate}T${dueTime}`);
  return dueDateTime < now;
}
