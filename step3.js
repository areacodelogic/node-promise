const fs = require("fs");
const axios = require("axios");

function cat(path) {
  let p = new Promise(function(resolve, reject) {
    fs.readFile(path, "utf8", function(err, data) {
      if (err) {
        return reject(err);
      }
      // console.log(`file contents: ${data}`);
      resolve(data);
    });
  });
  console.log(p)
  return p
}

function webCat(path) {
  let response = axios.get(path);

  response
    .then(res => console.log(res.data))
    .catch(e => {
      //   console.log(e);
      console.log(
        `Error fetching ${path} ERROR: Request failed with status code ${e.response.status}`
      );
    });
}

function catWrite(path, filename) {
  let content;
  console.log(path, filename)

  if (path.includes("http")) {
    response = axios.get(path);

    response
      .then(res => (content = res.data))
      .catch(e => {
        //   console.log(e);
        console.log(
          `Error fetching ${path} ERROR: Request failed with status code ${e.response.status}`
        );
      });
  } else {
      
      content = cat(path);
      console.log("this is what content is", content)
          fs.writeFileSync(filename, content, "utf8", function(err) {
            if (err) {
              console.log(err);
              process.exit(1);
            }
          })
      

  }
  console.log(`no output, but ${filename} contains ${path}`);
}

if (process.argv[2] === "--out") {
  catWrite(process.argv[4], process.argv[3]);

} else if (process.argv[2].includes("http")) {
  webCat(process.argv[2]);

} else {
  cat(process.argv[2]);
}
