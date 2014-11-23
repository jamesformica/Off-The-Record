module QuestionHelper

	def get_random_question
		random_questions = [
			"Does cheese smell like chicken?",
			"Are pirates alergic to garlic?",
			"What have you used Windex to heal?"
		]

		random_questions.sample
	end
end