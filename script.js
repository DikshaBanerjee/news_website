const api_key ="3bd3e93b5ef146ed8e4406c7059ead3c";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=> fetchNews("all"));

async function fetchNews (query){
    const res = await fetch(`${url}${query}&apiKey=${api_key}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData (articles){
    const cardContainer = document.getElementById('card_container');
    const cardTemp = document.getElementById('card_temp');

    cardContainer.innerHTML = '';

    articles.forEach(articles =>{
        if(!articles.urlToImage) return;
        const cardClone = cardTemp.content.cloneNode(true);

        fillDataToCard(cardClone,articles)
        cardContainer.appendChild(cardClone);
    });
}

function fillDataToCard(cardClone, articles){
    const newsImg = cardClone.querySelector('#news_img');
    const newsTitle = cardClone.querySelector('#cd_title');
    const newsSrc = cardClone.querySelector('#cd_src');
    const newsDesc = cardClone.querySelector('#cd_desc');
    
    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML = articles.title;
    newsDesc.innerHTML = articles.description;

    const date = new Date(articles.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });
    newsSrc.innerHTML = `${articles.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener("click", () =>{
        window.open(articles.url, "_blank");
    })
}


let currSelcNav = null;
function onNavEleClick(id){
    fetchNews(id);
    const navEle = document.getElementById(id);
    currSelcNav?.classList.remove("active");
    currSelcNav = navEle;
    currSelcNav.classList.add("active");
}

const inputArea=document.getElementById('input_area');
const searchBtn=document.getElementById('search_btn');

searchBtn.addEventListener('click', () => {
    const query= inputArea.value;
    if(!query) return;
    fetchNews(query);

    currSelcNav?.classList.remove("active");
    currSelcNav = null;

    inputArea.value = null;
})


function reload (){
    window.location.reload();
}