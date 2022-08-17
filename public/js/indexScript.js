/*
 ██████╗ █████╗ ██████╗ ██████╗  ██████╗ ██╗   ██╗███████╗███████╗██╗         ██████╗  █████╗ ██████╗ ████████╗██╗ █████╗ ██╗     
██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██║   ██║██╔════╝██╔════╝██║         ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║██╔══██╗██║     
██║     ███████║██████╔╝██████╔╝██║   ██║██║   ██║███████╗█████╗  ██║         ██████╔╝███████║██████╔╝   ██║   ██║███████║██║     
██║     ██╔══██║██╔══██╗██╔══██╗██║   ██║██║   ██║╚════██║██╔══╝  ██║         ██╔═══╝ ██╔══██║██╔══██╗   ██║   ██║██╔══██║██║     
╚██████╗██║  ██║██║  ██║██║  ██║╚██████╔╝╚██████╔╝███████║███████╗███████╗    ██║     ██║  ██║██║  ██║   ██║   ██║██║  ██║███████╗
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚══════╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═╝╚══════╝                                                                                                                   
*/


let nbr = 5;
let depPoint = 0;
const container = document.querySelector('#carrousel');
const leftBtn = document.querySelector('#leftBtn');
const rightBtn = document.querySelector('#rightBtn');
container.style.width = (1280*nbr)+"px";

function btnVisibility() {
  if (depPoint == -nbr+1) {
    leftBtn.style.visibility = "hidden";
  } else {
    leftBtn.style.visibility = "visible";
  }
  if (depPoint == 0) {
    rightBtn.style.visibility = "hidden";
  } else {
    rightBtn.style.visibility = "visible";
  }
}

document.body.onload = function() {
  for (i=1; i<=nbr; i++) {
    div = document.createElement ("div");
    div.className = "photo";
    div.style.backgroundImage = "url('/images/image"+i+".jpg')";
    container.appendChild(div);
  }
}

leftBtn.onclick = function() {
  if(depPoint > -nbr+1) {
    depPoint--;
    container.style.transform = "translate("+depPoint*1280+"px)";
    container.style.transition = "all 0.5s ease";
    btnVisibility()
  }
}

rightBtn.onclick = function() {
  if(depPoint < 0) {
    depPoint++;
    container.style.transform = "translate("+depPoint*1280+"px)";
    container.style.transition = "all 0.5s ease";
    btnVisibility()
  }
}





/*
 ██████╗ █████╗ ████████╗███████╗ ██████╗  ██████╗ ██████╗ ██╗███████╗███████╗         █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗
██╔════╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝ ██╔═══██╗██╔══██╗██║██╔════╝██╔════╝        ██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║
██║     ███████║   ██║   █████╗  ██║  ███╗██║   ██║██████╔╝██║█████╗  ███████╗        ███████║██║  ██║██╔████╔██║██║██╔██╗ ██║
██║     ██╔══██║   ██║   ██╔══╝  ██║   ██║██║   ██║██╔══██╗██║██╔══╝  ╚════██║        ██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║
╚██████╗██║  ██║   ██║   ███████╗╚██████╔╝╚██████╔╝██║  ██║██║███████╗███████║███████╗██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║
 ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝                                                                                                                      
*/



