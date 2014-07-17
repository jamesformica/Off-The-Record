  module Api
  	module V1

  		class AgentsController < ApplicationController
  			respond_to :json

  			def index
  				respond_with Agent.all
  			end

  			def create 
  				agent = Agent.new(agent_params)
  				if agent.save
  					# respond_with(agent, location: nil)
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

  	end
  end