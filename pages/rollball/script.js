let id = null;

function start() {
    let start = document.getElementById("rolling");
    let end = document.getElementById("rollingend");
    let pos = 11;
    let a = 11;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
        if (a >= 85) {
            if (pos == 11) {
                a = pos;
            };
            pos--;
            start.style.left = pos + "%";
            start.style.background = "#063974";
            end.style.right = pos + "%";
            end.style.background = "#ffffff";
        } else {
            pos++;
            a++;
            start.style.left = pos + "%";
            start.style.background = "#ffffff";
            end.style.right = pos + "%";
            end.style.background = "#063974";
        }
    }
}

function stop() {
    let start = document.getElementById("rolling");
    let end = document.getElementById("rollingend");
    let pos = 11;
    start.style.left = pos + "%";
    end.style.right = pos + "%";
    clearInterval(id)
}


