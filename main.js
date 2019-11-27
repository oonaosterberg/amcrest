const pad2 = (number) => {

    return (number < 10 ? '0' : '') + number;

};

const date = new Date;
const day = pad2(date.getDate());
const month = pad2(date.getMonth() + 1);
const year = pad2(date.getFullYear());
const weekday = pad2(date.getDay());
let lista = document.getElementById('ruokaLista');

document.getElementById('kampuslista').addEventListener('click', function() {

    lista.innerHTML = "";

    let url = 'https://cors-anywhere.herokuapp.com/https://www.sodexo.fi/ruokalistat/output/daily_json/' +
        + event.target.id + '/' + year + '/' + month + '/' + day + '/fi';

    console.log(day);
    console.log(month);
    console.log(year);

        fetch(url).then((response) => {
            if(response.ok) {
                return response.json();
            }
            else{
                throw new Error('Response not ok');
            }
        }).then((result) => {

            const lunch = result.courses;
            console.log(lunch[0]);

            for (let i = 0; i < lunch.length; i++) {


                lista.innerHTML += lunch[i].title_fi.bold() + ' / ' + lunch[i].title_en.bold() + ' ' + '<br>' + 'Hinta: ' + lunch[i].price + '<br>' +
                    lunch[i].properties + "<br>" + "<br>";
            }

            if (weekday == 0 || weekday == 6) {
                lista.innerHTML = 'Tämä ravintola ei tarjoile lounasta viikonloppuisin.';
            }
        })

})




