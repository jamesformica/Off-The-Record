## Summary
# index: returns a list of friend requests for the current user (if any)
# create: various validation results in a new request being created

module Api
	module V1

		class FriendshipRequestsController < ApplicationController
			respond_to :json

			def create
				toUser = User.find_by(username: request_params[:username])
				if toUser
					friend_req = FriendshipRequest.new(from_user_id: current_user.id, to_user_id: toUser.id)
					if friend_req.save
						render json: friend_req, status: :ok
					else
						render json: {errors: friend_req.errors.full_messages }, status: :unprocessable_entity
					end
				else
					render json: { errors: ["Ain't nobody called #{request_params[:username]}"] }, status: :unprocessable_entity
				end
			end


			def destroy
				if current_user.friendship_requests.find(request_params[:id]).destroy()
					render json: { message: "Friendship request deleted successfully"}, status: :ok
				else
					render json: { errors: "Friendship Request not exist" }, status: :not_found
				end
			end


			private
			def request_params
				puts params
				params.permit(:id, :username)
			end

			

		end
	end
end
