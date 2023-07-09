const fs = require("fs");
const http = require("http");
const readline = require("readline");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url=='/'){
    res.end(`<h1>CRUD Operation</h1>`)
  }
  else if(url === "/read") {
    fs.readFile("a.txt", "utf-8", (err, data) => {
      if (err) throw err;
      else {
        console.log("file read is successful ... ");
        res.end(`<h1>the content of the file is ---> ${data} </h1> `);
      }
    });
  } else if (url === "/write") {
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Please enter your new content here ->  ", (data) => {
      fs.writeFile("a.txt", data, (err) => {
        if (err) throw err;
        res.end('<h1>file write successful ... </h1>');
      });
    });
  }
  
  else if(url==='/delete'){
    fs.unlink('a.txt',()=>{
        res.end("<h1>file deleted successfully ....</h1> ")
    })
  }
  else{
    res.end("<h1>please give proper URL  !!! .... </h1>")
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
