const fs = require("fs");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", function(err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`file contents: ${data}`);
  });
}

// async function webCat(path) {
//   try {
//     let resp = await axios.get(path);
//     console.log(resp);
//   } catch (error) {
//     console.log("ERROR: Request has failed");
//     process.exit(1);
//   }
// }

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

// console.log(typeof process.argv[2])

if (process.argv[2].includes("http")) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}

