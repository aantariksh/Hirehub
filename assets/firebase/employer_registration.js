async function saveEmployersFormData() {
    const db = firebase.database()
    const snapshot = await db.ref('employers/newEmployerID').once('value')
    const eId = snapshot.val()
    db.ref('employers/e' + eId).set({
        name:  document.getElementById('name').value,
        phone:  document.getElementById('phone').value,
        email:  document.getElementById('email').value,
        address:  document.getElementById('address').value,
        dob:  document.getElementById('dob').value,
        industry:  document.getElementById('ind').value,
        joining:  document.getElementById('joining').value,
        candidateType:  document.getElementById('candidateType').value
    })
    .then(() => {
        const newEId = Number(eId) + 1
        db.ref('employers/newEmployerID').set(newEId)
        Swal.fire(
            'Application Submitted!',
            'Our team will process your application and get back to you.',
            'success'
        ).then(() => location.reload())
    })
    .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Please try again later.',
            footer: error
        }).then(() => location.reload())
    });
}
