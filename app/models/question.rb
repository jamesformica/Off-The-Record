class Question < ActiveRecord::Base

	has_many :answers
	has_many :to, :class_name => "UserQuestion" 
	belongs_to :owner, :class_name => "User"

	validates :question, presence: true, length: { minimum: 1 }
	validates :owner_id, presence: true

	#validates_with QuestionValidator

end
