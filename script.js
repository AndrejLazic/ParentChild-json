async function json(){
    const response = await fetch('https://raw.githubusercontent.com/Danilovesovic/zadatak_json/master/data.json');
    const data = await response.json();
    //console.log(data);

    document.body.innerHTML = display(data, "main");
    setClicks();
}

let text = ``;

function display(data, className){
    text += `<ul class="${className}">`;
    data.forEach(mainList => {
        //console.log(mainList);
        if(mainList.children.length > 0){
            text += `<li class="arrow">${mainList.name}`;
        }else{
            text +=`<li class="not_active">${mainList.name}</li>`;
        }
        if(mainList.children.length > 0){
            display(mainList.children[0],"nested");
            text += `</li>`;
        }
    });
    text += `</ul>`;

    return text;
}

function setClicks(){
    let arrows = document.querySelectorAll('.arrow');
    //console.log(arrows);
    for (let i=0; i<arrows.length; i++){
        arrows[i].addEventListener('click',function (event){
            event.stopPropagation();
            if(!event.target.classList.contains('not_active')){
                if(event.target.classList.contains('arrow_down')){
                    let allNested = event.target.querySelectorAll('.nested');
                    for (let i=0; i<allNested.length; i++){
                        const nested = allNested[i];
                        nested.classList.remove('active');
                        nested.classList.remove('arrow_down');
                        nested.parentElement.classList.remove('active');
                        nested.parentElement.classList.remove('arrow_down');
                    }
                }else{
                    this.querySelector(".nested").classList.toggle('active');
                    this.classList.toggle('arrow_down');
                }
            }
        });
    }
}
