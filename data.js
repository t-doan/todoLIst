const dataKey = "todo-list";
let data = readData();
function readData() {
    const localData = localStorage.getItem(dataKey);
    if (localData) {
        return JSON.parse(localData);
    }
    return {
        entries: [],
        nextEntryId: 1,
    };
}
function writeData() {
    localStorage.setItem(dataKey, JSON.stringify(data));
}
function addEntry(entry) {
    const newEntry = {
        ...entry,
        taskId: data.nextEntryId++,
    };
    data.entries.push(newEntry);
    writeData();
    return newEntry;
}
function getEntries() {
    return [...data.entries];
}
function deleteEntry(taskId) {
    data.entries = data.entries.filter((entry) => entry.taskId !== taskId);
    writeData();
}
export { addEntry, getEntries, deleteEntry };
