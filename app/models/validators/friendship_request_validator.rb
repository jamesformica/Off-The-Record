class FriendRequestValidator < ActiveModel::Validator

	def initialize(request)
		@request = request
		@to_user = request.to_user
		@from_user = request.from_user
	end

	def validate
		if request_already_sent?
			@request.errors[:base] << "Request already pending"
		end
		if friendship_already_exists?
			@request.errors[:base] << "Already friends with #{@to_user.username}"
		end
	end

	private
	def request_already_sent?
		@to_user.friendship_requests.exists?(from_user_id: @from_user.id) || @from_user.friendship_requests.exists?(from_user_id: @to_user.id)
	end

	private
	def friendship_already_exists?
		@to_user.friendships.exists?(friend_id: @from_user.id)
	end

end