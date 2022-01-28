firebase.auth().onAuthStateChanged((user) => {
  if(user){
      showCandidateDetails()
  }
})

function showCandidateDetails() {
  const table = document.getElementById("candidateDetails")
  const rowTemplate = `
  <tr>
    <td><a href="candidate-details.html?id={}" target="_blank">{}</a></td>
    <td>{}</td>
    <td>{}</td>
    <td>{}</td>
    <td>{}</td>
    <td>{}</td>
    <td>
        <a onclick="removeCandidate('{}')" class="bi bi-trash-fill text-danger" style="cursor:pointer"></a>
    </td>
  </tr>`

  firebase.database().ref('shortlisted/').on('value', (snapshot) => {
    const data = snapshot.val()
    console.log(data)
    if (Object.keys(data).length == 1) {
        table.innerHTML = '<tr><td colspan="7">No Candidate data</td></tr>'
    }
    table.innerHTML = ""
    jQuery.each(data, function (id, d) {
        if (id!=="x"){
            newRow = rowTemplate.format(id, id, d.name, d.edu, d.exp, d.workStatus, d.industry, id, id)
            table.innerHTML += newRow
        }
    })
  }, (error) => {
    Swal.fire({icon: "error", title: "Oops...", text: `${error}`});
  });
}

function removeCandidate(cId) {
  if(confirm('Are you sure you want to remove applicant ', cId, '? This can\'t be undone.')) {
    firebase.database().ref(`shortlisted/${cId}`).remove()
    .then(function () {
      Swal.fire({icon: "success", title: "Removed Candidate"});
    })
    .catch(function (e) {
      Swal.fire({icon: "error", title: "Oops...", text: `${e.message}`});
    });
  }
}
