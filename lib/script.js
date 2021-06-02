const fs = require('fs');
const path = require('path');

// This function filters through the `notes` array. If the id does NOT match, the current note gets added to `postDeleteArray`. Matching ids do nothing.
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