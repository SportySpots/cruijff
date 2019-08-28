const fs = require('fs');

fs.readFile("dist/index.html", "utf8", function(err, data) {
  fs.writeFile("dist/index.json", JSON.stringify({bundle: data}), console.log);
});
