import express from 'express';
const router = express.Router();
import { read, create, update, remove } from '../controllers/bmical.js';

// http://localhost:5000/api/bmical
router.get('/bmical', (req,res) =>{
    res.send('Hello bmical Endpoint!');
});

router.post('/bmical', (req,res) =>{
    res.send('Hello bmical Endpoint!');
});

router.put('/bmical', (req,res) =>{
    res.send('hello bmical Endpoint!');
});

router.delete('/bmical',(req,res) =>{
    res.json({name: 'hello bmical Endpoint!',id: 1});
});

router.get('/bmical/read', read);
router.post('/bmical/create', create);
router.put('/bmical/update', update);
router.delete('/bmical/remove', remove);


export default router;