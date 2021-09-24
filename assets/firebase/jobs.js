async function saveCandidatesFormData() {
    try{
        const db = firebase.database()
        // Get next candidate Id
        const snapshot = await db.ref('candidates/newCandidateID').once('value')
        const cId = snapshot.val()
    
        // Uploading Resume
        const file = document.getElementById("candidateResume").files[0];
        const fileRef = firebase.storage().ref(`resume/${cId}/` + file.name);
        const uploadTaskSnapshot = await fileRef.put(file);
        const resumeLink = await uploadTaskSnapshot.ref.getDownloadURL();

        // Upload candidate details
        db.ref(`candidates/c${cId}`).set({
            name:  document.getElementById('name').value,
            phone:  document.getElementById('phone').value,
            email:  document.getElementById('email').value,
            address:  document.getElementById('address').value,
            edu:  document.getElementById('edu').value,
            exp:  document.getElementById('exp').value,
            ref:  document.getElementById('ref').value,
            workStatus:  document.getElementById('work-status').value,
            relocate:  document.getElementById('relocate').value,
            industry:  document.getElementById('ind').value,
            dob:  document.getElementById('dob').value,
            maritalStatus:  document.getElementById('marital-status').value,
            joining:  document.getElementById('joining').value,
            crime:  document.getElementById('crime').value,
            resumeLink,
        })
        .then(() => {
            const newCId = Number(cId) + 1
            // TODO: make this op thread safe
            // Update newCandidateID
            db.ref('candidates/newCandidateID').set(newCId)
            Swal.fire(
                'Application Submitted!',
                'Our team will process your application and get back to you.',
                'success'
            ).then(() => location.reload())
        })
    }
    catch(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Please try again later.',
            footer: error
        }).then(() => location.reload())
    }
}
