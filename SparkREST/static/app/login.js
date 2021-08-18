Vue.component("login", {
	data: function () {
		    return {
			  user: {username:null, password:null, name:null, surname:null, gender:null, date:null, role: null},
			   error: null
		    }
	},
	template: ` 
<div>
	<h3>Prijava</h3>
     <p v-if="error" style="color:red">{{ error }}</p>
	<form>
	<p>
	<label>Korisničko ime</label>
	<input type = "text" v-model = "user.username" name = "username">
	</p>
	<p>
	<label>Lozinka</label>
	<input type = "password" v-model = "user.password" name = "password">
	</p>
	<input type = "submit" v-on:click = "logIn" value = "Prijavi se">
	</form>
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
        axios
          .get('rest/restaurants/getJustRestaurants')
          .then(response => (this.products = response.data))
    },
});