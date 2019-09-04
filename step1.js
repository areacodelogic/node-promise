
function cat(path){
    
    const fs = require ('fs');
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.log(err)
            process.exit(1);
        }
        console.log(`file contents: ${data}`)
    })

}

cat(process.argv[2])