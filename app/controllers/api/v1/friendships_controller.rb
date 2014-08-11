module Api
	module V1

		class FriendshipsController < ApplicationController
			def index #return list of friends for current_user
			end

			def create #destroy friendship request #create both normal and inverse friendships
				friendship_a = current_user.friendships.build(friend_id: params[:from_user_id])
				friendship_b = User.find(params[:from_user_id]).friendships.build(friend_id: current_user.id)
				if friendship_a.save && friendship_b.save && FriendshipRequest.find(params[:id]).destroy
					render json: friendship_a, status: :ok
				else
					render json: { errors: friendship_a.errors.full_messages }, status: :unprocessable_entity
				end
			end

			def destory #destroy both normal and inverse friendships
			end
		end
	end
end