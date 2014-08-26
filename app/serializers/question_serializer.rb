class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :question, :is_owner
  has_many :answers

  def is_owner
  	object.owner == current_user
  end

end
