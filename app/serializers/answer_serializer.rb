class AnswerSerializer < ActiveModel::Serializer
	attributes :id, :answer, :user_id, :user_username

	def user_username
		object.user.username
	end
end
