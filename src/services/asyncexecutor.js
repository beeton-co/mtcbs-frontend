
let pending = undefined;



export const executeEventually = (f) => {
  if (!pending) {
    pending = [];
    window.setTimeout(executeNow, 10);
  }
  pending.push(f);
};

function executeNow() {
  let toDo = pending;
  pending = null;
  if (toDo) {
    toDo.forEach(function (func) {
      try{
        func();
      }catch (error){
        //TODO ignore?????
      }
    });
  }
}

1525387291
1524799273