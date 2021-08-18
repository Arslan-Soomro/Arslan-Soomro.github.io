//Globals
const USERNAME = "arslan-soomro";
const INCFILENAME = "$$$INCLUDEPROJECT$$$.json";

//Projects-container slider logic
const slider = document.querySelector('.projects-container');
let isDown = false;
let startX;
let scrollLeft;

//The Scroll Animation of Projects container Slider
const sliderObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting){
        
        slider.scrollLeft = slider.offsetWidth;

        setTimeout(() => slider.scrollLeft = 0, 1000);
    }
}, {threshold: [1]});
sliderObserver.observe(slider);


slider.addEventListener('mousedown', (e) => {
    isDown = true;

    //To properly scroll when clicking
    slider.classList.remove("scroll-smooth");
    sliderObserver.disconnect();

    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
});

slider.addEventListener('mouseup', () => {
    isDown = false;
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
});

//Api Calls

const getAllRepos = async () => {

    console.log("return data");

    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos`);
    const data = await res.json();

    console.log(data);

    return data;
}

const filterOneRepo = item => {
    return {
        name: item.name,
        description: item.description,
        url: item.html_url,
        pagelink: item.homepage, 
    }    
}

const filterRepoProps = rawData => {
    const newData = rawData.map(filterOneRepo);

    return newData;
}


const getIncludedRepos = async (repos) => {
    
    console.log("Included");

    let res;
    let data;
    let repArr;

    for(let i = 0; i < repos.length; i++){
        res = await fetch(`https://api.github.com/repos/${USERNAME}/${repos[i].name}/contents/${INCFILENAME}`);
        data = await res.json();

        if(data && data.name){
            console.log(i + " " + data.name);
        }else{
            console.log(i + " Empty");
        }
    }
}

const getContents = async () => {
    
    const res = await fetch(`https://api.github.com/repos/arslan-soomro/qaj/contents/`);
    const data = await res.json();

    console.log(data);
}

//getContents();

getAllRepos().then(data => getIncludedRepos(data));

// fetch("https://raw.githubusercontent.com/Arslan-Soomro/Login-App/main/%24%24%24INCLUDEPROJECT%24%24%24.json")
//     .then(res => res.json())
//     .then(data => console.log(data));



