class Answer < ActiveRecord::Base

	belongs_to :user
	belongs_to :question

	validates :answer, presence: true, on: :update
	validates :user_id, presence: true
	validates :question_id, presence: true

end
