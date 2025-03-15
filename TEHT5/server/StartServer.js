const { exec } = require("child_process");

// Suorita komento
exec("json-server --watch db.json", (error, stdout, stderr) => {
  if (error) {
    console.error(`Virhe: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Virhetilanne: ${stderr}`);
    return;
  }
  console.log(`Palvelimen ulostulo: ${stdout}`);
});
