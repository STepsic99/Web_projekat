Vue.component("restaurantDetails", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   restaurant: null,
			   status: ""
		    }
	},
	template: ` 
<div style="background: rgba(255, 255, 255, 0.8);padding: 10px 115px 25px 45px; max-width: 1200px;margin: auto;">
	<h1 style="font-size:45px">{{this.restaurant.name}}</h1>
    <table style=" width: 100%;">
	<tr>
	<td> <div class="txtimg">
	<img  v-bind:src="this.restaurant.imagePath" alt="Restaurant" width="600" height="480"/>
	</div>
	</td>
	<td style=" width: 100%;">
	<span style="font-size:25px">
	Lokacija: {{this.restaurant.location.address}} <br><br>
	Tip restorana: {{this.restaurant.type}} <br><br>
	Status restorana: {{this.status}} <br><br>
	Prosečna ocena: {{this.restaurant.averageGrade}} <br><br>
	</span>
	</td>
	</tr>
	</table>
	<h2 style="font-size:30px">Artikli</h2>
	<table style="column-count: 2;display: flex;max-width:100px;">
	<tr style="display: grid; grid-template-columns: repeat(4, 1fr)" >
	<td style="padding-left:3em;padding-bottom:5em " v-for="a in restaurant.articles">
	 <div class="txtimg">
	<img  v-bind:src="a.image" alt="Article" width="250" height="230"/>
	</div>
	<h2 style="font-size:27px" >{{a.name}}</h2><br>
	{{a.description}}<br><br>
	<span style="font-size:20px">{{a.price}} RSD </span><br><br>
	<input type="number" style="width:80px" size="33" min="1" value="1">
	<button style="margin-left:10px">Dodaj u korpu</button>
	</td>
	</tr>
	</table>
</div>		  
`
	, 
	methods : {
		logIn : function () {
			event.preventDefault();
			axios
			.post('rest/user/login', this.user)
			.then(response => {
				if(response.data==="ERROR"){
					 this.error="Uneli ste neodgovarajuće korisničko ime ili lozinku.";
				}
				else{
					this.$root.$emit('prijavljivanje', 0);
					router.push(`/`)
				}
			})
		}
	},
	mounted () {
		var s='/rest/restaurant/'+ this.$route.params.id
        axios
          .get(s)
          .then(response => {this.restaurant = response.data
				if(this.restaurant.status=="OPEN")
				this.status="Radi";
				else this.status="Ne radi"
			})
    },
});