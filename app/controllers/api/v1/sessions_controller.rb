module Api
	module V1

		class SessionsController < ApplicationController

			def create
				cred = params[:session][:email].downcase
				user = User.where("lower(email) = ?", cred).first || User.where("lower(username) = ?", cred).first
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

			# def signedin
			# 	if signed_in?
			# 		render json: { message: "Signed in"}, status: :ok
			# 	else
			# 		render json: { message: "Not signed in"}, status: :unauthorized
			# 	end
			# end

		end

	end
end