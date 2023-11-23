// App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  const addItem = async (e) => {
    e.preventDefault();
    try {
      if (!itemText) {
        console.log('Item text is empty');
        return;
      }

      const res = await axios.post('http://localhost:4000/api/item', { item: itemText });

      // Use res.data.item to update the listItems
      setListItems([...listItems, res.data.item]);
      setItemText('');
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/item/${id}`);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/item/${id}`, { item: itemText });

      const updatedList = listItems.map((item) => (item._id === id ? { ...item, item: itemText } : item));

      setListItems(updatedList);
      setEditingItemId(null);
      setItemText('');
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = (id, currentItem) => {
    setEditingItemId(id);
    setItemText(currentItem.item);
  };

  const cancelEditing = () => {
    setEditingItemId(null);
    setItemText('');
  };

  useEffect(() => {
    const getItemList = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/items');
        setListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getItemList();
  }, []);

  return (
    <div className='App'>
      <h1>Todo List</h1>
      <form className='form' onSubmit={(e) => addItem(e)}>
        <input
          type='text'
          placeholder='Add Todo Item'
          onChange={(e) => setItemText(e.target.value)}
          value={itemText}
        />
        <button type='submit'>Add</button>
      </form>
      <div className='todo-listItems'>
        {Array.isArray(listItems) &&
          listItems.map((item) => (
            <div key={item._id} className='todo-item'>
              {editingItemId === item._id ? (
                <>
                  <input
                    type='text'
                    value={itemText}
                    onChange={(e) => setItemText(e.target.value)}
                  />
                  <button onClick={() => updateItem(item._id)}>Save</button>
                  <button onClick={cancelEditing}>Cancel</button>
                </>
              ) : (
                <>
                  <p className='item-content'>{item.item}</p>
                  <div className='button-container'>
                    <button onClick={() => startEditing(item._id, item)}>Update</button>
                    <button onClick={() => deleteItem(item._id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
