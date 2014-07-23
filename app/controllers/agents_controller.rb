class AgentsController < ApplicationController
	respond_to :json


	def index
		respond_with Agent.all
	end

	def new
		render json: Agent.new
	end

	def create 
		agent = Agent.new(agent_params)
		if agent.save
			render json: { message: "Sign Up successful!"}, status: :ok
		else
			render json: { errors: agent.errors.full_messages }, status: :unprocessable_entity
		end
	end

	def destroy
		respond_with Agent.destroy(params[:id])
	end

	

	private
	def agent_params
		params.require(:agent).permit(:name, :email, :username, :password, :password_confirmation)
	end

end
