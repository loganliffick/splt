splt = ({ target = ".splt", reveal = false }) => {
  let saveOriginal = [];

  //grab entities
  const entity = document.querySelectorAll(target);

  for (let a = 0; a < entity.length; a++) {
    entity[a].setAttribute("id", "i" + [a + 1]);

    //saves original text to an array for revert functionality
    saveOriginal.push(entity[a].innerHTML);

    //split entity text
    const entityChars = entity[a].innerHTML.split("");
    for (let b = 0; b < entityChars.length; b++) {
      //nest child span
      const span = document.createElement("span");
      entity[a].appendChild(span);
      span.setAttribute("id", "c" + [b + 1]);

      //check if child = char or whitespace
      if (entityChars[b] == " ") {
        span.classList.add("whtSpc");
      } else {
        span.classList.add("char");
        //add char styles
        const char = document.querySelectorAll(".char");
        for (let c = 0; c < char.length; c++) {
          char[c].style.display = "inline-block";
          char[c].style.overflow = "hidden";
          char[c].style.verticalAlign = "top";
        }
      }

      //reveal init
      if (reveal == true) {
        //nest grandchild span
        const spanChild = document.createElement("span");
        spanChild.innerHTML = entityChars[b]; //set text to grandchild span
        span.appendChild(spanChild);
        spanChild.setAttribute("id", "r");
        spanChild.classList.add("reveal");
        //add charReveal styles
        const charReveal = document.querySelectorAll(".reveal");
        for (let d = 0; d < charReveal.length; d++) {
          charReveal[d].style.display = "inherit";
          charReveal[d].style.overflow = "inherit";
          charReveal[d].style.verticalAlign = "inherit";
        }
      } else {
        span.innerHTML = entityChars[b]; //set text to child span
      }
    }

    entity[a].removeChild(entity[a].childNodes[0]); // remove initial text input
  }

  //undo text splitting
  splt.revert = () => {
    for (let e = 0; e < entity.length; e++) {
      entity[e].removeAttribute("id");
      entity[e].innerHTML = saveOriginal[e]; //sets text to original value
    }
  };
};

module.exports = splt;
