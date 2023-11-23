const express = require('express');
const router = express.Router();
const TodoItemModel = require('../models/todoItems');

// router.post('/api/item', async (req, res) => {
//   try {
//     if (!req.body.item) {
//       return res.status(400).json({ error: 'Item text is required' });
//     }

//     const newItem = new TodoItemModel({
//       item: req.body.item,
//     });

//     const savedItem = await newItem.save();
//     res.status(200).json({ message: 'Item added successfully', item: savedItem });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
router.post('/api/item', async (req, res) => {
    try {
      console.log(req.body); // Log the request body
  
      if (!req.body.item) {
        return res.status(400).json({ error: 'Item text is required' });
      }
  
      const newItem = new TodoItemModel({
        item: req.body.item,
      });
  
      const savedItem = await newItem.save();
      res.status(201).json({ message: 'Item added successfully', item: savedItem });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
router.get('/api/items', async (req, res) => {
  try {
    const allTodoItems = await TodoItemModel.find({});
    res.status(200).json(allTodoItems);
  } catch (e) {
    res.json(e);
  }
});

router.put('/api/item/:id', async (req, res) => {
  try {
    const updateItem = await TodoItemModel.findByIdAndUpdate(
      req.params.id,
      { $set: { item: req.body.item } },
      { new: true }
    );

    if (!updateItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully', item: updateItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/api/item/:id', async (req, res) => {
  try {
    const deleteItem = await TodoItemModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Item deleted');
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
