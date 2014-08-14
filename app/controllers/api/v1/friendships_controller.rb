module Api
	module V1

		class FriendshipsController < ApplicationController

			def create
				friendship_a = current_user.friendships.new(friend_id: params[:from_user_id])
				friendship_b = User.find(params[:from_user_id]).friendships.build(friend_id: current_user.id)
				if friendship_a.save && friendship_b.save && FriendshipRequest.find(params[:id]).destroy
					render json: friendship_a, status: :ok
				else
					render json: { errors: friendship_a.errors.full_messages }, status: :unprocessable_entity
				end
			end

			def destroy
				friendship_a = current_user.friendships.find(params[:id])
				friendship_b = friendship_a.friend.friendships.find_by(friend_id: current_user.id)
				if friendship_a.destroy && friendship_b.destroy
					render json: { message: "friendship successfully destroyed" }, status: :ok
				else	
					render json: { errors: friendship_a.errors.full_messages }, status: :unprocessable_entity
				end
			end
		end
	end
end