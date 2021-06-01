const fs = require('fs');
const path = require('path');

function filterId(id, notes) {
    const postDeleteArray = notes.filter(note => {
        return note.id !== id;
    })
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(postDeleteArray, null, 2)
    );
    return postDeleteArray;
}

module.exports = filterId;