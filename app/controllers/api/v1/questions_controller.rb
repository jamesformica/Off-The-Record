module Api
	module V1

		class QuestionsController < ApplicationController

			def new
				render json: Question.new
			end

			def create
				render json: "testing", status: :ok
			end
		end
	end
end
