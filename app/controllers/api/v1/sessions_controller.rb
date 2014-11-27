module Api
	module V1

		class SessionsController < ApplicationController

			def create
				cred = params[:session][:email]
				user = User.find_by_email(cred) || User.find_by_username(cred)
				if user 
					if user.authenticate(params[:session][:password])
						sign_in user
						render json: { message: "Sign In successful"}, status: :ok
					else
						render json: { errors: ["Wrong password"]}, status: :unprocessable_entity
					end
				else
					render json: { errors: ["Can't find who you're looking for"]}, status: :not_found
				end
			end

			def destroy
				sign_out
				render json: { message: "Sign out successful"}, status: :ok
			end

		end

	end
end