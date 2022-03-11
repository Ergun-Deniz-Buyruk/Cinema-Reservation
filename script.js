const container = document.querySelector(".container");
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

container.addEventListener("click", function(e) {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change', function(e) {
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArray = [];
    const seatsArray = [];

    // NodeListteki her veriyi b,r arraya at.
    selectedSeats.forEach(function(seat) {
        selectedSeatsArray.push(seat);
    });

    // NodeListteki her veriyi b,r arraya at.
    seats.forEach(function(seat) {
        seatsArray.push(seat);
    });

    // [0, 1, 5, ...]
    let selectedSeatIndexs = selectedSeatsArray.map(function (seat) {
        return seatsArray.indexOf(seat);
    });


    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;    

    saveToLocalStorage(selectedSeatIndexs);
}

function saveToLocalStorage(indexsArray) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexsArray));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}

/*
 * Uygulama ilk açıldığında local storageden bilgileri çek.
*/
function getFromLocalStorage() {

    /*
     * Seçilen koltuklar sayfa ilk yüklendiğinde ekranda görünsün.
    */
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    /*
     * En son seçilen filmi sayfa ilk yüklendiğinde ekranda görünsün.
    */
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }


}