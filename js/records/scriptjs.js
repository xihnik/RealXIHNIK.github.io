var artur_id = 0;
var artur_distance_id = 0;

function waitForLoad(id, callback) {
    var timer = setInterval(function () {
        if (document.getElementById(id)) {
            clearInterval(timer);
            callback();
        }
    }, 100);
}

waitForLoad("table_records", function () {

    function add_row() {
        var x = document.getElementById("table_records");
        var row = x.insertRow();

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.innerHTML = localStorage.getItem('nickname');
        cell2.innerHTML = localStorage.getItem('time');

        artur_id++;
        artur_distance_id++;
    }
    add_row();
    // add_row();
    // add_row();
    // add_row();
    // add_row();
    // add_row();
});