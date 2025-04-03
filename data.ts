// data.ts
interface Data {
  entries: Entry[];
  nextEntryId: number;
}

interface Entry {
  taskId: number;
  task: string;
  details?: string;
  dueDate: string;
  dueTime: string;
}

const dataKey = "todo-list";

let data = readData();

function readData(): Data {
  const localData = localStorage.getItem(dataKey);
  if (localData) {
    return JSON.parse(localData) as Data;
  }
  return {
    entries: [],
    nextEntryId: 1,
  };
}

function writeData(): void {
  localStorage.setItem(dataKey, JSON.stringify(data));
}

function addEntry(entry: Omit<Entry, "taskId">): Entry {
  const newEntry = {
    ...entry,
    taskId: data.nextEntryId++,
  };
  data.entries.push(newEntry);
  writeData();
  return newEntry;
}

function getEntries(): Entry[] {
  return [...data.entries];
}

function deleteEntry(taskId: number): void {
  data.entries = data.entries.filter((entry) => entry.taskId !== taskId);
  writeData();
}

export { addEntry, getEntries, deleteEntry, type Entry };
