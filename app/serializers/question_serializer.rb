class QuestionSerializer < ActiveModel::Serializer
	attributes :id, :question, :is_owner, :answered, :completely_answered, :viewed
	has_many :answers
	has_many :to

	def is_owner
		object.owner == current_user
	end

	def answered
		!object.answers.find_by(user_id: current_user.id).answer.blank?
  	end

  	def completely_answered
  		!object.answers.any?{ |a| a.answer.blank? }
  	end

  	def viewed
  		object.answers.find_by(user_id: current_user.id).viewed
  	end

end
