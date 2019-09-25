const username = 'christinampagano'; // change to your treehouse username!
const dataDiv = document.querySelector('.treehouse');

/*
  ============================================================
*/

let badgeHTML = '<ul>';

function fetchData(url) {
  return fetch(url)
          .then(checkStatus)
          .then(res => res.json())
          .catch(error => {
            dataDiv.innerHTML = `${username} doesn't exist!`;
          })
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
  let badgeList = data[0].badges;
  if (!dataDiv.classList.contains('reverse')) {
    badgeList === badgeList.reverse();
  }
  badgeList.forEach(createBadge);
  badgeHTML += '</ul>';
  dataDiv.innerHTML = badgeHTML;
}

function createBadge(item) {
  let badgeName = item['name'];
  let imgURL = item['icon_url'];
  let courseURL = item['url'];
  let html = `
      <li><a href='${courseURL}' target='_blank'>
      <img src='${imgURL}' alt='${badgeName}'>
  `;
  if (dataDiv.classList.contains('caption')) {
    html += `<p class='caption'>${badgeName}</p>`  ;
  }
  html += `</a></li>`;
  badgeHTML += html;
}
