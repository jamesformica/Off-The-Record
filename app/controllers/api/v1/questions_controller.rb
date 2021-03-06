module Api
	module V1

		class QuestionsController < ApplicationController

			include QuestionHelper

			def create

				question_to_ask = question_params[:question]
				own_answer = question_params[:answer]
				people_to = question_params[:to]

				if people_to.blank?
					render json: { errors: ["Please select at least one friend"] }, status: :unprocessable_entity
					return
				end

				if own_answer.blank?
					return render json: { errors: ["Please provide your own answer"] }, status: :unprocessable_entity
				end

				question = Question.new(question: question_to_ask, owner_id: current_user.id)
				if question.save
					User.create_user_question(current_user.id, question.id, own_answer)

					people_to.each do |friend|
						User.create_user_question(friend[:friend_id], question.id, nil)
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

			def random_question
				render json: RandomQuestion.get_random_question
			end

			private
			def question_params
				params[:question][:to] ||= []
				params.require(:question).permit(:question, :answer, to: [:friend_id])
			end

		end
	end
end
