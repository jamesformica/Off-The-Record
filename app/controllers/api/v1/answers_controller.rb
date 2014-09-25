
module Api
	module V1

		class AnswersController < ApplicationController

			def update
				answer = Answer.find(params[:id])
				if (answer.update_attributes(answer_params))
					render json: answer.question, status: :ok
				else
					render json: {errors: answer.errors.full_messages }, status: :unprocessable_entity 
				end
			end

			private
			def answer_params
				params.permit(:answer, :viewed)
			end

		end

	end
end