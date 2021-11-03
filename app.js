
function generatebarrios(data) {
        // get uniques
        var uniques = data.reduce(function (a, d) {
            if (a.indexOf(d.barrio) === -1) {
                a.push(d.barrio);
            }
            return a;
        }, []);
        // remove nulls
        uniques = uniques.filter(n => n)
        // populate options
        let optionList = document.getElementById('barrio').options;
        uniques.forEach(option =>
            optionList.add(
                new Option(option, option)
            )
        );
    }
    function generaterentas(data) {
        // get uniques
        var uniques = data.reduce(function (a, d) {
            if (a.indexOf(d.renta_anual) === -1) {
                a.push(d.renta_anual);
            }
            return a;
        }, []);
        // remove nulls
        uniques = uniques.filter(n => n)
        // populate options
        let optionList = document.getElementById('renta_anual').options;
        uniques.forEach(option =>
            optionList.add(
                new Option(option, option)
            )
        );
    }

    function changer(data) {
        // change result
        var barrio = document.getElementById('barrio').value
        var renta_anual = document.getElementById('renta_anual').value
        var fetched = data.filter(a => a.barrio == barrio && a.renta_anual == renta_anual);
        console.log(fetched)
        document.getElementById("precio").innerHTML = fetched[0]["m2"] + ' m2'
    }
    function fetcher() {
        // load data
        Papa.parse('./data/bbdd_elrealista.csv', {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function (results) {
                generatebarrios(results.data)
                generaterentas(results.data)
                changer(results.data)
            }
        });
    }

    fetcher()

    function mortgageCalculator() {
        var salary = document.getElementById('salary').value
        var price = document.getElementById('price').value
        var down = document.getElementById('down').value
        var years = document.getElementById('years').value
        var monthlyinterest = document.getElementById('interest').value / 100 / 12
        var monthlypayment = (price - down) / ((1 - ((1 + monthlyinterest) ** (-years * 12))) / monthlyinterest)
        var totalcost = monthlypayment * 12 * years
        var weeklysalary = salary / 52
        document.getElementById("payment").innerHTML = Math.round(monthlypayment * 100) / 100
        document.getElementById("totalcost").innerHTML = Math.round(totalcost * 100) / 100
        document.getElementById("totalinterests").innerHTML = Math.round((totalcost - price) * 100) / 100
        document.getElementById("weeksfortotalcost").innerHTML = Math.round(totalcost / weeklysalary)
        document.getElementById("weeksforcapital").innerHTML = Math.round(price / weeklysalary)
        document.getElementById("weeksforinterests").innerHTML = Math.round((totalcost - price) / weeklysalary)
    }
    mortgageCalculator()

    function plotter() {
        var weeks = parseFloat(document.getElementById("weeksfortotalcost").innerHTML)
        var age = parseFloat(document.getElementById('age').value)
        var completeyears = Math.floor(weeks / 52)
        var remainingweeks = weeks - (completeyears * 52)
        var finalagecomplete = age + completeyears
        var lastage = finalagecomplete + 1
        var series = []
        for (let step = 18; step < 91; step++) {
            if (step === (finalagecomplete+1)) {
                var weekslst = []
                for (let wstep = 1; wstep < 53; wstep++) {
                    if (wstep <= remainingweeks) {
                        weekslst.push(1)
                    } else {
                        weekslst.push(0)
                    }
                }
                var serie = {
                    name: step,
                    data: weekslst
                }
                series.push(serie)
            } else if (step >= age && step <= finalagecomplete) {
                var serie = {
                    name: step,
                    data: Array(52).fill(1)
                }
                series.push(serie)
            } else {
                var serie = {
                    name: step,
                    data: Array(52).fill(0)
                }
                series.push(serie)                
            }
        }
        var options = {
            series: series,
            chart: {
                height: 1350,
                type: 'heatmap',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 80,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            title: {
                text: 'La parte de mi vida que se lleva la hipoteca'
            },
            yaxis: {
                title: { text: 'Edad' },
                reversed: true
            },
            xaxis: {
                title: { text: 'Semana' },
            },
            legend: {
                show: false,
            },
            plotOptions: {
                heatmap: {
                    radius: 2,
                    enableShades: true,
                    shadeIntensity: 0.5,
                    reverseNegativeShade: true,
                    distributed: false,
                    useFillColorAsStroke: false,
                    colorScale: {
                        ranges: [{
                            from: 0,
                            to: 0.5,
                            color: "#008FFB",
                        }, {
                            from: 0.5,
                            to: 1,
                            color: "#ff0000",
                        }],
                        inverse: false,
                        min: undefined,
                        max: undefined
                    },
                }
            },
        };
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }
    plotter()


    function showNextSlider(){
        console.log('CLICK')
        const sliders = document.querySelectorAll('.horizontal-slider .slide')
        console.log(sliders)

        sliders.forEach(slider =>
          slider.setAttribute = 'hidden'
        );
    }


