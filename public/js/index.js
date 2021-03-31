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
