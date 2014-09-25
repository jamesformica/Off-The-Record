module Api
	module V1

		class QuestionsController < ApplicationController

			def create

				question = Question.new(question: question_params[:question], owner_id: current_user.id)
				if question.save

					current_user.user_questions.create(question_id: question.id)
					current_user.answers.create(question_id: question.id, answer: question_params[:answer])

					question_params[:to].each do |friend|
						qFriend = User.find(friend[:friend_id])
						qFriend.user_questions.create(question_id: question.id)
						qFriend.answers.create(question_id: question.id)
					end

					render json: question, status: :ok
					
				else
					render json: {errors: question.errors.full_messages }, status: :unprocessable_entity
				end
			end

			
			def show
				if Question.exists?(q_id = params[:id])
					render json: Question.find(q_id), status: :ok
				else
					render json: { errors: ["Question not found"]}, status: :unprocessable_entity
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
