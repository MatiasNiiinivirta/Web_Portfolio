(loadPage = () => {
  fetch("http://localhost:3000/items")
    .then((res) => res.json())
    .then((data) => {
      displayUser(data);
    });
})();

const userDisplay = document.querySelector(".table"); //haetaan taulukko elementti

displayUser = (data) => {
  userDisplay.innerHTML += `
      <thead>
      <tr>
          <th>Id</th>
          <th>Nimi</th>
          <th>Puhelin</th>
          <th>Poista</th>
          <th>Muokkaa</th>
  
      </tr>
  
      </thead>
  
      `;
  displayRow(data);
};

displayRow = (data) => {
  data.forEach((user) => {
    userDisplay.innerHTML += `
        <tbody>
        <tr data-id="${user.id}">
            <td>${user.id}</td>
            <td>${user.nimi}</td>
            <td>${user.puhelin}</td>
            <td><input type="button" onClick="removeRow(${user.id})" value="x"/></td>
            <td><input type="button" onClick="editRow(${user.id})" value="Muokkaa"/></td>
        </tr>
        </tbody>
        `;
  });
};

removeRow = async (id) => {
  console.log(id);
  let polku = "http://localhost:3000/items/" + id;

  try {
    const response = await fetch(polku, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Poisto epäonnistui");
    }

    console.log("Poisto onnistui");

    // Etsi ja poista rivi taulukosta
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (row) {
      row.remove(); // Poistaa rivin näkyvästä taulukosta
    }
  } catch (error) {
    console.error(error);
  }
};

editRow = (id) => {
  let row = document.querySelector(`tr[data-id='${id}']`);
  let cells = row.getElementsByTagName("td");

  // Muutetaan solut input-kentiksi
  let nimi = cells[1].innerText;
  let puhelin = cells[2].innerText;

  cells[1].innerHTML = `<input type="text" value="${nimi}" id="edit-nimi-${id}">`;
  cells[2].innerHTML = `<input type="text" value="${puhelin}" id="edit-puhelin-${id}">`;

  // Muutetaan muokkausnappi tallennuspainikkeeksi
  cells[4].innerHTML = `<input type="button" onClick="saveRow(${id})" value="Tallenna"/>`;
};

saveRow = async (id) => {
  let editedNimi = document.getElementById(`edit-nimi-${id}`).value;
  let editedPuhelin = document.getElementById(`edit-puhelin-${id}`).value;

  let polku = "http://localhost:3000/items/" + id;
  let data = { nimi: editedNimi, puhelin: editedPuhelin };

  await fetch(polku, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let row = document.querySelector(`tr[data-id='${id}']`);
  let cells = row.getElementsByTagName("td");

  cells[1].innerText = editedNimi;
  cells[2].innerText = editedPuhelin;

  cells[4].innerHTML = `<input type="button" onClick="editRow(${id})" value="Muokkaa"/>`;
};

async function postFormDataAsJson({ url, formData }) {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);
  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: formDataJsonString,
  };
  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({ url, formData });

    addRow(responseData);

    form.reset();

    console.log({ responseData });
  } catch (error) {
    console.error(error);
  }
}

function addRow(user) {
  const userDisplay = document.querySelector(".table tbody");

  // Luo uusi rivi
  const newRow = document.createElement("tr");
  newRow.setAttribute("data-id", user.id);

  newRow.innerHTML = `
      <td>${user.id}</td>
      <td>${user.nimi}</td>
      <td>${user.puhelin}</td>
      <td><input type="button" onClick="removeRow(${user.id})" value="x"/></td>
      <td><input type="button" onClick="editRow(${user.id})" value="Muokkaa"/></td>
    `;

  // Lisää rivi taulukon loppuun
  userDisplay.appendChild(newRow);
}

const exampleForm = document.getElementById("puhelintieto_lomake");
exampleForm.addEventListener("submit", handleFormSubmit);
