// event Handelers

document.querySelector('div#main #github-form').addEventListener('submit', (e) => {
    e.preventDefault()
    getSearchUsers(e.target.search.value)
    e.target.reset()
})

// DOM Manipulators

function createUserList(user) {
    const ul = document.querySelector('#github-container #user-list')
    const li = document.createElement('li')
    li.textContent = user
    ul.appendChild(li)

    li.addEventListener('click', (e) => getReposForGithubUser(e.target.textContent))
}

function createRepoList(repo) {
    const ul = document.querySelector('#repos-list')
    const li = document.createElement('li')
    li.textContent = repo
    ul.append(li)
}

// GET requests

function getSearchUsers(user) {
    // run this for whatever the e.target.value is for the search
    fetch(`https://api.github.com/search/users?q=${user}`, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(resp => resp.json())
    .then(users => (users.items).forEach(user => createUserList(user.login)))
}


function  getReposForGithubUser(user) {
    fetch(`https://api.github.com/users/${user}/repos`, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(resp => resp.json())
    .then(repos => repos.forEach(repo => createRepoList(repo.full_name)))
}
// .forEach(createRepoList(repos.full_name)))

// when a user searches by a particular name, we will run a GET request on the GitHub API with the name in there
// when a user clicks on the GitHub user it will run another GET request to deposit that Github users repos to the screen
// need to have an event listener that takes in user input from the search
// need an event listener for the click event on a user