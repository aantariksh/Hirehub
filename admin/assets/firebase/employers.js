firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    showAllEmployerDetails();
  }
});

function showAllEmployerDetails() {
  const table = document.getElementById("employerDetails");
  firebase.database().ref("employers/").on("value", (snapshot) => {
    const data = snapshot.val();
    table.innerHTML = "";
    const rowTemplate = `
        <tr>
          <td><a href="employer-details.html?eId={}" target="_blank">{}</a></td>
          <td>{}</td>
          <td>{}</td>
          <td>{}</td>
          <td>{}</td>
          <td>{}</td>
          <td>
              <a onclick="removeEmployer('{}')" class="bi bi-trash-fill text-danger" style="cursor:pointer"></a>
          </td>
        </tr>`;

    jQuery.each(data, function (id, d) {
      if (id !== "newEmployerID") {
        newRow = rowTemplate.format(id, id, d.name, d.phone, d.email, d.industry, d.candidateType, id)
        table.innerHTML += newRow
      }
    });
  }, (error) => {
    Swal.fire({icon: "error", title: "Oops...", text: `${error}`});
  });
}

function removeEmployer(eId) {
  if (confirm("Are you sure you want to remove employer ", eId, '? This can\'t be undone.')) {
    firebase.database().ref(`employers/${eId}`).remove()
    .then(function () {
      Swal.fire({icon: "success", title: "Removed Employer"});
    })
    .catch(function (e) {
      Swal.fire({icon: "error", title: "Oops...", text: `${e.message}`});
    });
  }
}
