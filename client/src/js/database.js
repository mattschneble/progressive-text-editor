import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {console.log('PUT to the database');
// Create a connection to the database and version we want to use
const jateDB = await openDB('jate', 1);
// Create a transaction on the database
const tx = jateDB.transaction('jate', 'readwrite');
// Get the object store we want to use
const store = tx.objectStore('jate');
// Use the put method to add the content
const request = store.put({ id: 1, text: content});
// Wait for the request to complete
const result = await request;
// Console log the result with a message
console.log('Successfully added content to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {console.log('GET from the database');
// Create a connection to the database and version we want to use
const jateDB = await openDB('jate', 1);
// Create a transaction on the database
const tx = jateDB.transaction('jate', 'readonly');
// Get the object store we want to use
const store = tx.objectStore('jate');
// Use the get method to only return one entry from the database
const request = store.get(1);
// Wait for the request to complete
const result = await request;
// Console log the result if there is one
result
  ? console.log('Successfully retrieved content from the database', result.value)
  : console.log('No content found in the database');
return result?.value;
};

initdb();
