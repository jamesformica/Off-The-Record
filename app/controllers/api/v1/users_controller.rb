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
					render json: { message: "Sign Up successful!"}, status: :ok
				else
					render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
				end
			end

			def destroy
				respond_with User.destroy(params[:id])
			end

			def get_current_user
				render json: current_user
			end

			private
			def user_params
				params.require(:user).permit(:name, :email, :username, :password, :password_confirmation)
			end

		end
	end
end