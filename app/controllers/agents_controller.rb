class AgentsController < ApplicationController
	respond_to :json

	def index
		respond_with Agent.all
	end

	def create 
		#respond_with Agent.create(agent_params)
		agent = Agent.new(agent_params)
		if agent.valid? && agent.save
			respond_with agent
		else
			render :json => { :errors => agent.errors.full_messages }, :status => 422
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
