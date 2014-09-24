class QuestionValidator < ActiveModel::Validator

	def validate(question)
		@question = question
		@owner = question.owner

		@question.errors[:base] << "Please provide an answer" unless !@question.answers.where("user_id = ?", @owner.id).first.answer.blank?

	end

end