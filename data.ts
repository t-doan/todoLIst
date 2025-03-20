//exported data, and write data
interface Data {
  entries: Entry[];
  nextEntryId: number;
}

const dataKey = `todo-list`; // create a data-key

const data = readData();

function readData(): Data {
  let data: Data;
  const localData = localStorage.getItem(dataKey); //access local storage and get data with dataKey
  if (localData){
    data = JSON.parse(localData) as Data; //convert JSON to JS object
  } else{
    data  ={
      entries: [],
      nextEntryId: 1,
    };
  }
  return data;
}


function writeData(): void{
  const dataJSON = JSON.stringify(data); //convert data to JSON
  localStorage.setItem(dataKey, dataJSON);
}
