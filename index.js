const remove_file = require('./remove.js');
const append_file = require('./append.js');

const path = 'Readme.md'

let getSummary = () => {
    let connection = firedb.ref("Summary");
    connection.on('value', function(snapshot){
    	return snapshot.val();
	});
}

remove_file(path);

append_file(path, "## Kyle Tolliver");
append_file(path, "Hello")
//append_file(path, getSummary);
