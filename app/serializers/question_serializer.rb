class QuestionSerializer < ActiveModel::Serializer
	attributes :id, :question, :is_owner, :answered
	has_many :answers
	has_many :to

	def is_owner
		object.owner == current_user
	end

	def answered
		object.answers.any?{ |a| a.user_id == current_user.id }
  	end

end
