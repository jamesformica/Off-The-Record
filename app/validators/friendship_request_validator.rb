class FriendshipRequestValidator < ActiveModel::Validator

	def validate(request)
		@request = request
		@to_user = request.to_user
		@from_user = request.from_user
		
		return unless @to_user && @from_user

		@request.errors[:base] << "Dude, you can't add yourself" unless @to_user != @from_user
		@request.errors[:base] << "Request already pending" unless !request_already_sent?
		@request.errors[:base] << "Already friends with #{@to_user.username}" unless !friendship_already_exists?
	end

	def request_already_sent?
		@to_user.friendship_requests.exists?(from_user_id: @from_user.id) || @from_user.friendship_requests.exists?(from_user_id: @to_user.id)
	end

	def friendship_already_exists?
		@to_user.friendships.exists?(friend_id: @from_user.id)
	end

end
