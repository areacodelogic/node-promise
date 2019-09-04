const fs = require("fs");
const axios = require("axios");

function cat(path) {
  // let p = new Promise(function(resolve, reject) {
  //   fs.readFile(path, "utf8", function(err, data) {
  //     if (err) {
  //       return reject(err);
  //     }
  //     console.log(`file contents: ${data}`);
  //     resolve(data);
  //   });
  // });
  // return p;
  console.log(path);
  return fs.readFileSync(`${__dirname}/${path}`, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(`file contents: ${data}`);
    }
  });
}

function webCat(url) {
  let response = axios.get(url);

  response
    .then(res => console.log(res.data))
    .catch(e => {
      //   console.log(e);
      console.log(
        `Error fetching ${path} ERROR: Request failed with status code ${e.response.status}`
      );
    });
}

function catWrite(fileToRead, fileToWrite) {
  let content = cat(fileToRead);
  fs.writeFileSync(fileToWrite, content, "utf8", function(err) {
    if (err) {
      process.exit(1);
    } else {
      console.log(content);
    }
  });
}

if (process.argv[2] === "--out") {
  console.log("processing out");
  console.log(process.argv[3]);
  console.log(process.argv[4]);

  catWrite(process.argv[4], process.argv[3]);
} else if (process.argv[2].includes("http")) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}

// if (path.includes("http")) {
//   response = axios.get(path);
//   response
//     .then(res => (content = res.data))
//     .catch(e => {
//       //   console.log(e);
//       console.log(
//         `Error fetching ${path} ERROR: Request failed with status code ${e.response.status}`
//       );
//     });
// } else {

//     content = cat(path);
//         fs.writeFileSync(filename, content, "utf8", function(err) {
//           if (err) {
//             console.log(err);
//             process.exit(1);
//           } else {
//             console.log(content)
//           }
//         })

// }
// console.log(`no output, but ${filename} contains ${path}`);
