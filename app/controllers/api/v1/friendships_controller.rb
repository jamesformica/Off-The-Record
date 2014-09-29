module Api
	module V1

		class FriendshipsController < ApplicationController

			def create
				friendship_a = current_user.friendships.new(friend_id: friendship_params[:from_user_id])
				friendship_b = User.find(friendship_params[:from_user_id]).friendships.build(friend_id: current_user.id)
				if friendship_a.save && friendship_b.save && FriendshipRequest.find(friendship_params[:id]).destroy
					render json: friendship_a, status: :ok
				else
					render json: { errors: friendship_a.errors.full_messages }, status: :unprocessable_entity
				end
			end

			def destroy
				friendship_a = current_user.friendships.find(params[:id])
				friendship_b = friendship_a.friend.friendships.find_by(friend_id: current_user.id)
				if friendship_a.destroy && friendship_b.destroy
					render json: friendship_a, status: :ok
				else	
					render json: { errors: friendship_a.errors.full_messages }, status: :unprocessable_entity
				end
			end

			private
			def friendship_params
				params.require(:friendship).permit(:id, :from_user_id)
			end
		end
	end
end