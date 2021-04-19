const url="http://127.0.0.1:8080";
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("userEmail").innerHTML= localStorage.getItem("EmailLogado");
	fillTable();
  
			
		
});
function fillTable() {
    fetch(url + '/api/lastactivities')
        .then(res => res.json())
        .then((out) => {
            $('#tableActivities tbody').empty();
            $.each(out, function(index, value) {
				if(value.status=="Aprovada") {
					$('#tableActivities tbody').append('<tr><td>' + value.title + '</td> <td class="d-none d-xl-table-cell">'+ value.init_data+'</td><td class="d-none d-xl-table-cell">'+ value.end_data+'</td><td><span class="badge bg-success">Aprovada</span></td><td class="d-none d-md-table-cell">'+value.activityType+'</td></tr>')
				}
				if(value.status=="Por aprovar"||value.status=="Por avaliar"){
					$('#tableActivities tbody').append('<tr><td>' + value.title + '</td> <td class="d-none d-xl-table-cell">'+ value.init_data+'</td><td class="d-none d-xl-table-cell">'+ value.end_data+'</td><td><span class="badge bg-warning">'+ value.status+'</span></td><td class="d-none d-md-table-cell">'+value.activityType+'</td></tr>')
				}
			
			if(value.status=="Finalizada"){
				$('#tableActivities tbody').append('<tr><td>' + value.title + '</td> <td class="d-none d-xl-table-cell">'+ value.init_data+'</td><td class="d-none d-xl-table-cell">'+ value.end_data+'</td><td><span class="badge bg-info">Finalizada</span></td><td class="d-none d-md-table-cell">'+value.activityType+'</td></tr>')
			}

            });
        }).catch(err => console.error(err));
}


		document.addEventListener("DOMContentLoaded", function() {
			var ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
			var gradient = ctx.createLinearGradient(0, 0, 0, 225);
			gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
			gradient.addColorStop(1, "rgba(215, 227, 244, 0)");
			// Line chart

			setUpLineDashboard();
  
			async function setUpLineDashboard() {
		
			const res = await fetch(url + '/api/activitiesyear', {
			  headers: {
				  'Content-Type': 'application/json'
			  },
			  mode: 'cors',
			  method: 'GET',
			  credentials: 'include'
		  }); 
			const datadashboardline = await res.json();
		  
			
			new Chart(document.getElementById("chartjs-dashboard-line"), {
				type: "line",
				data: {
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
					datasets: [{
						label: "Atividades",
						fill: true,
						backgroundColor: gradient,
						borderColor: window.theme.primary,
						data: [
							datadashboardline.jan,
							datadashboardline.feb,
							datadashboardline.mar,
							datadashboardline.apr,
							datadashboardline.may,
							datadashboardline.jun,
							datadashboardline.jul,
							datadashboardline.aug,
							datadashboardline.sep,
							datadashboardline.oct,
							datadashboardline.nov,
							datadashboardline.dec
						]
					}]
				},
				options: {
					maintainAspectRatio: false,
					legend: {
						display: false
					},
					tooltips: {
						intersect: false
					},
					hover: {
						intersect: true
					},
					plugins: {
						filler: {
							propagate: false
						}
					},
					scales: {
						xAxes: [{
							reverse: true,
							gridLines: {
								color: "rgba(0,0,0,0.0)"
							}
						}],
						yAxes: [{
							ticks: {
								stepSize: 1000
							},
							display: true,
							borderDash: [3, 3],
							gridLines: {
								color: "rgba(0,0,0,0.0)"
							}
						}]
					}
				}
			});
		}
		});

		document.addEventListener("DOMContentLoaded", function() {
			// Pie chart
			fillPieChart();
  
			async function fillPieChart() {
		
			const res = await fetch(url + '/api/preferences/dashboard', {
			  headers: {
				  'Content-Type': 'application/json'
			  },
			  mode: 'cors',
			  method: 'GET',
			  credentials: 'include'
		  }); 
			const datapie = await res.json();
			console.log(datapie)
			console.log(datapie[0])
			new Chart(document.getElementById("chartjs-dashboard-pie"), {
				type: "pie",
				data: {
					labels: [datapie[0].name, datapie[1].name, datapie[2].name],
					datasets: [{
						data: [datapie[0].total, datapie[1].total, datapie[2].total],
						backgroundColor: [
							datapie[0].color,
							datapie[1].color,
							datapie[2].color
						],
						borderWidth: 5
					}]
				},
				options: {
					responsive: !window.MSInputMethodContext,
					maintainAspectRatio: false,
					legend: {
						display: false
					},
					cutoutPercentage: 75
				}
			});
			document.getElementById("name0").innerHTML= datapie[0].name;
			document.getElementById("total0").innerHTML= datapie[0].total;
			document.getElementById("name1").innerHTML= datapie[1].name;
			document.getElementById("total1").innerHTML= datapie[1].total;
			document.getElementById("name2").innerHTML= datapie[2].name;
			document.getElementById("total2").innerHTML= datapie[2].total;
		}
		});

		

		document.addEventListener("DOMContentLoaded", function() {
			document.getElementById("datetimepicker-dashboard").flatpickr({
				inline: true,
				prevArrow: "<span title=\"Previous month\">&laquo;</span>",
				nextArrow: "<span title=\"Next month\">&raquo;</span>",
			});
		});

		let datadashboardline;
		let currentActivity=1;

		document.addEventListener("DOMContentLoaded", function() {
			
			setUpActivityType();
  
			async function setUpActivityType() {
		
			const res = await fetch(url + '/api/activitiestype', {
			  headers: {
				  'Content-Type': 'application/json'
			  },
			  mode: 'cors',
			  method: 'GET',
			  credentials: 'include'
		  }); 
			datadashboardline = await res.json();
			document.getElementById("dashboardActivity").innerHTML= datadashboardline[0].name
			document.getElementById("activity1").innerHTML= datadashboardline[0].name
			document.getElementById("activity2").innerHTML= datadashboardline[0].name
			document.getElementById("activity3").innerHTML= datadashboardline[0].name
			document.getElementById("activity4").innerHTML= datadashboardline[0].name

			fetch(url + '/api/activitiestype/'+datadashboardline[0].idActivityType)
			.then(res => res.json())
			.then((out) => {
				console.log(out)
				
					document.getElementById("totalActivity").innerHTML=out.quantity;
					document.getElementById("totalInscription").innerHTML=out.inscriptions;
					document.getElementById("totalPresence").innerHTML=out.presences;
					document.getElementById("totalFeedback").innerHTML=out.feedback;
				
			}).catch(err => console.error(err));
		}
		});

		const changeActivity= document.getElementById("dashboardActivityicon")
		changeActivity.addEventListener("click",function (){
			if(currentActivity <datadashboardline.length){
				document.getElementById("dashboardActivity").innerHTML= datadashboardline[currentActivity].name
			document.getElementById("activity1").innerHTML= datadashboardline[currentActivity].name
			document.getElementById("activity2").innerHTML= datadashboardline[currentActivity].name
			document.getElementById("activity3").innerHTML= datadashboardline[currentActivity].name
			document.getElementById("activity4").innerHTML= datadashboardline[currentActivity].name

			fetch(url + '/api/activitiestype/'+datadashboardline[currentActivity].idActivityType)
			.then(res => res.json())
			.then((out) => {
				
					document.getElementById("totalActivity").innerHTML=out.quantity;
					document.getElementById("totalInscription").innerHTML=out.inscriptions;
					document.getElementById("totalPresence").innerHTML=out.presences;
					document.getElementById("totalFeedback").innerHTML=out.feedback;

			}).catch(err => console.error(err));
			currentActivity++;
			console.log(currentActivity)
		} else {

			document.getElementById("dashboardActivity").innerHTML= datadashboardline[0].name
			document.getElementById("activity1").innerHTML= datadashboardline[0].name
			document.getElementById("activity2").innerHTML= datadashboardline[0].name
			document.getElementById("activity3").innerHTML= datadashboardline[0].name
			document.getElementById("activity4").innerHTML= datadashboardline[0].name

			fetch(url + '/api/activitiestype/'+datadashboardline[0].idActivityType)
			.then(res => res.json())
			.then((out) => {
				console.log(out)
				
					document.getElementById("totalActivity").innerHTML=out.quantity;
					document.getElementById("totalInscription").innerHTML=out.inscriptions;
					document.getElementById("totalPresence").innerHTML=out.presences;
					document.getElementById("totalFeedback").innerHTML=out.feedback;
				
			}).catch(err => console.error(err));
			currentActivity=1;
		}
		});

