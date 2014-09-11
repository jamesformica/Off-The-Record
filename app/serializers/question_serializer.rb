class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :question, :is_owner
  has_many :answers
  has_many :to

  def is_owner
  	object.owner == current_user
  end

end
