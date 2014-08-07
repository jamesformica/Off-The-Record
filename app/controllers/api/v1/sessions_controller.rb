module Api
	module V1

		class SessionsController < ApplicationController

			def create
				cred = params[:session][:email].downcase
				user = User.find_by(email: cred) || User.find_by(username: cred)
				if user && user.authenticate(params[:session][:password])
					sign_in user
					render json: { message: "Sign In successful"}, status: :ok
				else
					render json: { errors: ["Invalid credentials"]}, status: :unprocessable_entity
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