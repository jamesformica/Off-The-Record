## Summary
# index: returns a list of friend requests for the current user (if any)
# create: various validation results in a new request being created



class FriendshipRequestsController < ApplicationController
	def index
		rtn_requests = []
		current_user.friendship_requests.all.each do |request|
			rtn_requests.push(request_id: request.id, username: request.from_user.username)
		end
		render json: rtn_requests
	end

	def create
		#create single entry with to / from users
		toUser = User.find_by(username: request_params[:username])
		if toUser
			if request_already_sent?(toUser)
				render json: { errors: "Request already pending" }, status: :precondition_failed
			else
				if FriendshipRequest.create(from_user_id: current_user.id, to_user_id: toUser.id)
					render json: { message: "Friendship request submitted successfully"}, status: :ok
				else
					#something went wrong
				end
			end
		else
			render json: { errors: "User does not exist" }, status: :not_found
		end
	end


	private
	def request_params
		puts params
		params.permit(:username)
	end

	def request_already_sent?(toUser)
		toUser.friendship_requests.exists?(from_user_id: current_user.id)
	end

end
