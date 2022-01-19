const fs = require('fs');

let append_file = async (path, content) => {
    try {
        await fs.appendFile(`./${path}`, `${content} \n`, (err) => {
            if (err) throw err;
          
            //file appended
            console.log(`${path} appended`);
        });
    } catch(e) {
        console.error(e)
    };
};

module.exports = append_file;
