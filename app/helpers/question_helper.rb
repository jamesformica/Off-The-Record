module QuestionHelper

	class RandomQuestion

		@@random_questions = [
				"Does cheese smell like chicken?",
				"Are pirates alergic to garlic?",
				"What have you used Windex to heal?"
			]

		def self.get_random_question
			@@random_questions.sample
		end

	end
end