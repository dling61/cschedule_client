var UserAddView = Backbone.View.extend({
    el: '.MemberList',
    events: {
		'click #searchForMember': 'searchForMember',
		'click #deleteParticipant':'deleteParticipant',
		'click #addMember':'addMember',
    },
	
	searchForMember: function(){
		var userDetails = $('#email').val();		
	    var users = new Users();
		users.fetch({
			data: $.param({email: userDetails}),		
		    error:function(){
				$('#edit-user-form').show();
			    $('#inputEmail').val(userDetails);
			},
		    success: function(data){
				var participant = new Participant();
				participant.save({userid:users.models[0].attributes.id,
			                      name:users.models[0].attributes.username,
				                  email:users.models[0].attributes.email,
				                   mobile:users.models[0].attributes.mobile
			                     },
		                         {
									  success: function(){
										  var userListView = new UserListView();
										  userListView.render();
									  }
								 }
		      );				         
	      }				
       });			
    },
    
	addMember: function(){
		var name = $('#inputName').val();
		var email = $('#inputEmail').val();
		var mobile = $('#inputMobile').val();
		var user = new User();
		user.save({username: name,email:email,mobile:mobile},{
			success:function(){
				var users = new Users();
		        users.fetch({
					data: $.param({email: email}),
			        success:function(data){
						var participant = new Participant();
						participant.save({userid:users.models[0].attributes.id,
					                      name:users.models[0].attributes.username,
				                          email:users.models[0].attributes.email,
				                          mobile:users.models[0].attributes.mobile   
					                     },
				                         {
											 success: function(){
												 var userListView = new UserListView();
				                                 userListView.render();
											}
										}
						);		
			       },					
		       });	
		   },
	    });										
	},	
	
	deleteParticipant: function(ev){
		var participant = new Participant({id:ev.target.value});
		participant.destroy({
			success: function(){
				var userListView = new UserListView();
	            userListView.render(); 
			},
			});
		
	},
   
});
 
