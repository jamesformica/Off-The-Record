class SessionsController < ApplicationController

	def create
		cred = params[:session][:email].downcase
		agent = Agent.find_by(email: cred) || Agent.find_by(username: cred)
		if agent && agent.authenticate(params[:session][:password])
			sign_in agent
			render json: { message: "Sign In successful"}, status: :ok
		else
			render json: { errors: ["Invalid credentials"]}, status: :unprocessable_entity
		end
	end

	def destroy
		sign_out
		render json: { message: "Sign out successful"}, status: :ok
	end

	def signedin
		if signed_in?
			render json: { message: "Signed in"}, status: :ok
		else
			render json: { message: "Not signed in"}, status: :unauthorized
		end
	end

end
