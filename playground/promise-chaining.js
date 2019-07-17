require('../src/db/mongoose');
const Task = require('../src/models/task');

// 5d2df455d5b19b31ef287f48

/* Task.findByIdAndDelete('5d2e1a35443dd445c6f8e12e').then(() => {
    return Task.find({});
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
}); */

const deletetaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ 'completed': false  })
    return count
}

deletetaskAndCount('5d2e18718b46bf44f5b37a1f').then((count) => {
    console.log(count); 
}).catch((e) => {
    console.log(e);
})