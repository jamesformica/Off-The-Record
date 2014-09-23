module Api
	module V1

		class QuestionsController < ApplicationController

			def new
				render json: Question.new
			end

			def create

				question = Question.new(question: question_params[:question], owner_id: current_user.id)
				if question.save

					current_user.user_questions.create(question_id: question.id)
					current_user.answers.create(question_id: question.id, answer: question_params[:answer])

					question_params[:to].each do |friend|
						UserQuestion.create(user_id: friend[:friend_id], question_id: question.id)
						Answer.create(user_id: friend[:friend_id], question_id: question.id)
					end

					render json: question, status: :ok
					
				else
					render json: {errors: question.errors.full_messages }, status: :unprocessable_entity
				end
			end


			private
			def question_params
				params[:question][:to] ||= []
				params.require(:question).permit(:question, :answer, to: [:friend_id])
			end

		end
	end
end
