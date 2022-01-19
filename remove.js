const fs = require('fs');

let remove_file = (path) => {
    try {
        if (fs.existsSync(path)) {
            //file exists
            fs.unlink(`./${path}`, (err) => {
                if (err) throw err;
              
                //file removed
                console.log(`${path} removed`);
            });
        } else {
            console.log(`${path} doesn't exist`);
        }
    } catch(e) {
        console.error(e)
    };
};

module.exports = remove_file;
