let langaugeType = 'en_US';

// ELEMENTS
const navList = document.getElementById('#championList');

fetch(`https://ddragon.leagueoflegends.com/cdn/languages.json`)
    .then(response => response.json())
    .then((data) => {
        // THIS IS TO FETCH THE LANGAUGE DATA, WHEN READY.
    })

const fetchChampions = (lang) => {
    fetch(`http://ddragon.leagueoflegends.com/cdn/11.19.1/data/${langaugeType}/champion.json`)
        .then(response => response.json())
        .then((data) => {
            Object.values(data.data).forEach(champion => {
                createListItem(champion.id);
            })
        })
}


// FUNCTION TO CREATE CHAMPION ITEMS ON NAVIGATION LIST
const createListItem = (champion) => {
    const listItem = document.createElement('li');
    const a = document.createElement('a');

    a.href = `#${champion}`
    a.textContent = champion

    listItem.appendChild(a);
    navList.appendChild(listItem);
}

const expandNav = (event) => {
    const navSection = document.querySelector('.champion-nav');
    const mainSection = document.querySelector('.main-container');

    if (event === 'nav') {
        navSection.style.display = 'none';
        mainSection.style.display = 'block';
    } else {
        navSection.style.display = 'flex';
        mainSection.style.display = 'none';
    }
}

const filterSearch = () => {
    input = document.querySelector('#input');
    console.log(input);
    filter = input.value.toUpperCase();
    li = navList.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('a')[0];

        txtValue = a.textContent || a.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

fetchChampions();