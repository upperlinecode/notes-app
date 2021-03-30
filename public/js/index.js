let firebase_user;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      firebase_user = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
  const noteTitle = document.getElementById('noteTitle').value;
  const noteText = document.getElementById('noteText').value;

  firebase.database().ref(`users/${firebase_user.uid}`).push({
    title: noteTitle,
    text: noteText
  }).then(() => {
    console.log('Note Submitted')
  });
}

const getNotes = () => {
  const notesRef = firebase.database().ref('users');
  notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderDataAsHtml(data)
  })
}

const renderDataAsHtml = data => {
  console.log('DATA', data);
  let innerHTML = "";
  for(const user in data) {
    console.log('User data', data[user])
    for(const noteItem in data[user]) {
      console.log('Note item', data[user][noteItem])
      const note = data[user][noteItem];
      innerHTML += `<h1>Note Title: ${note.title}</h1>`;
      innerHTML += `<p>${note.text}</p>`
    }
  }

  document.getElementById('app').innerHTML = innerHTML;
}