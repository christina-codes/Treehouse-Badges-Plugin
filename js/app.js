const username = 'christinampagano'; // change to your treehouse username!
const dataDiv = document.querySelector('#treehouse');
/*
  ============================================================
*/
function fetchData(url) {
  return fetch(url)
          .then(checkStatus)
          .then(res => res.json())
          .catch(error => console.log('Looks like there was a problem ', error))
}
Promise.all([
  fetchData(`https://teamtreehouse.com/${username}.json`)
])
.then(data => {
  generateHTML(data);
});

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function generateHTML(data) {
  let badgeHTML = '<ul>';
  const badgeList = data[0].badges;
  for (let i = 0; i < badgeList.length; i++) {
    let badgeName = badgeList[i]['name'];
    let imgURL = badgeList[i]['icon_url'];
    let courseURL = badgeList[i]['url'];
    let html = `
        <li><a href='${courseURL}' target='_blank'>
        <img src='${imgURL}' alt='${badgeName}'>
        </a></li>
    `;
    badgeHTML += html;
  }
  badgeHTML += '</ul>';
  dataDiv.innerHTML = badgeHTML;
}
