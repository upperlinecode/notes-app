window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      getNotes();
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    };
  });
};

const getNotes = () => {
  const notesRef = firebase.database().ref('users');
  notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderDataAsHtml(data);
  });
};

const renderDataAsHtml = data => {
  console.log('DATA', data);
  let cards = ``;
  for(const user in data) {
    console.log('User data', data[user])
    for(const noteItem in data[user]) {
      const note = data[user][noteItem];
      cards += createCard(note)
    };
  };
  document.getElementById('app').innerHTML = cards;
};

const createCard = (note) => {
  let innerHTML = "";
  innerHTML += `<div class="column is-one-quarter">`
  innerHTML += `<div class="card">`
  innerHTML += `<header class="card-header">`
  innerHTML += `<p class="card-header-title">`
  innerHTML += `${note.title}`
  innerHTML += `</p>`
  innerHTML += `</header>`
  innerHTML += `<div class="card-content">`
  innerHTML += `<div class="content">`
  innerHTML += `${note.text}`
  innerHTML += `</div>`
  innerHTML += `</div>`
  innerHTML += `</div>`
  innerHTML += `</div>`
  return innerHTML;
}