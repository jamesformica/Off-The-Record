module Api
	module V1
		class UsersController < ApplicationController
			respond_to :json

			def new
				render json: User.new
			end

			def create 
				user = User.new(user_params)
				if user.save
					render json: user, status: :ok
				else
					render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
				end
			end


			def update
				user = User.find(params[:id])
				if user == current_user
					if (user.update_attributes(user_params))
						render json: user, status: :ok
					else
						render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
					end
				end
			end


			def destroy
				respond_with User.destroy(params[:id])
			end

			private
			def user_params
				params.require(:user).permit(:name, :email, :username, :favourite_colour, :password, :password_confirmation)
			end

		end
	end
end