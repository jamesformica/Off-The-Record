class QuestionSerializer < ActiveModel::Serializer
  include UserHelper

  attributes :id, :question, :is_owner, :answered, :user_answer_id, :completely_answered, :viewed, :asker_colour
  has_many :answers
  has_many :to

  def is_owner
    object.owner == current_user
  end

  def answered
    !object.answers.find_by(user_id: current_user.id).answer.blank?
  end

  def user_answer_id
    object.answers.find_by(user_id: current_user.id).id
  end

  def completely_answered
    !object.answers.any?{ |a| a.answer.blank? }
  end

  def viewed
    object.answers.find_by(user_id: current_user.id).viewed
  end

  def asker_colour
    accent_colour(object.owner.username)
  end

end
