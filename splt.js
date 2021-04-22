function splt({ target = '.splt', reveal = false }) {
  let saveOriginal = [];

  //grab instances
  const inst = document.querySelectorAll(target);

  for (let a = 0; a < inst.length; a++) {
    inst[a].setAttribute('id', 'i' + [a + 1]);

    //saves original text to an array for revert functionality
    saveOriginal.push(inst[a].innerHTML);

    //split instance text
    const instChars = inst[a].innerHTML.split('');
    for (let b = 0; b < instChars.length; b++) {
      //nest child span
      const span = document.createElement('span');
      inst[a].appendChild(span);
      span.setAttribute('id', 'c' + [b + 1]);

      //check if child = char or whitespace
      if (instChars[b] == ' ') {
        span.classList.add('whtSpc');
      } else {
        span.classList.add('char');
        //add char styles
        const char = document.querySelectorAll('.char');
        for (let c = 0; c < char.length; c++) {
          char[c].style.display = 'inline-block';
          char[c].style.overflow = 'hidden';
          char[c].style.verticalAlign = 'top';
        }
      }

      //reveal init
      if (reveal == true) {
        //nest grandchild span
        const spanChild = document.createElement('span');
        spanChild.innerHTML = instChars[b]; //set text to grandchild span
        span.appendChild(spanChild);
        spanChild.setAttribute('id', 'r');
        spanChild.classList.add('reveal');
        //add charReveal styles
        const charReveal = document.querySelectorAll('.reveal');
        for (let d = 0; d < charReveal.length; d++) {
          charReveal[d].style.display = 'inherit';
          charReveal[d].style.overflow = 'inherit';
          charReveal[d].style.verticalAlign = 'inherit';
        }
      } else {
        span.innerHTML = instChars[b]; //set text to child span
      }
    }

    inst[a].removeChild(inst[a].childNodes[0]); // remove initial text input
  }

  //undo text splitting
  splt.revert = () => {
    for (let e = 0; e < inst.length; e++) {
      inst[e].removeAttribute('id');
      inst[e].innerHTML = saveOriginal[e]; //sets text to original value
    }
  };
}
