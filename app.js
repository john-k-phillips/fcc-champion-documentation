let langaugeType = 'en_US';

fetch('https://ddragon.leagueoflegends.com/cdn/languages.json')
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        langaugeType = data[1];
        console.log(langaugeType);
    })

fetch('http://ddragon.leagueoflegends.com/cdn/11.19.1/data/en_US/champion.json')
    .then(response => response.json())
    .then((data) => {
        Object.values(data.data).forEach(champion => {
            createListItem(champion.id);
        })
    })

// FUNCTION TO CREATE CHAMPION ITEMS ON NAVIGATION LIST
const createListItem = (champion) => {
    const navList = document.getElementById('#championList');
    const listItem = document.createElement('li');
    listItem.textContent = champion;
    navList.appendChild(listItem);
}

