class Question < ActiveRecord::Base

	has_many :answers
	has_many :to, :class_name => "UserQuestion" 
	belongs_to :owner, :class_name => "User"

end
