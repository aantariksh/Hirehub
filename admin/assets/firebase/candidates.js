firebase.auth().onAuthStateChanged((user) => {
    if(user){
        showAllCandidateDetails()
    }
})

function showAllCandidateDetails() {
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
            <a onclick="shortlist('{}')" class="bi bi-check-circle-fill text-success" style="cursor:pointer"></a> &nbsp; 
            <a onclick="removeCandidate('{}')" class="bi bi-trash-fill text-danger" style="cursor:pointer"></a>
        </td>
    </tr>`

    firebase.database().ref('candidates/').on('value', (snapshot) => {
        const data = snapshot.val()
        console.log(data)
        if (Object.keys(data).length == 1) {
            table.innerHTML = '<tr><td colspan="7">No Candidate data</td></tr>'
        }
        table.innerHTML = ""
        jQuery.each(data, function (id, d) {
            if (id!=="newCandidateID"){
                newRow = rowTemplate.format(id, id, d.name, d.edu, d.exp, d.workStatus, d.industry, id, id)
                table.innerHTML += newRow
            }
        })
    })
}

function removeCandidate(cId) {
    if(confirm('Are you sure you want to remove applicant ', cId, '? This can\'t be undone.')) {
        firebase.database().ref(`candidates/${cId}`).remove()
        .then(function () {
          console.log("OK, gone");
        })
        .catch(function (e) {
          console.log("OOPS, problem: " + e.message);
        });
    }
}

function shortlist(cId) {
    oldRef = firebase.database().ref(`candidates/${cId}`)
    newRef = firebase.database().ref(`shortlisted/${cId}`)

    oldRef.once('value', function(snap)  {
        newRef.set( snap.val(), function(error) {
             if( !error ) {  oldRef.remove(); }
             else {  console.error(error); }
        });
    });
}

function assignCandidateToEmployer(cId, eId) {
    firebase.database().ref(`selected/${eId}/${cId}`).set({
        "assignDate": new Date().toDateString()
    })
}
