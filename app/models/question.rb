class Question < ActiveRecord::Base

	has_many :answers
	belongs_to :owner, :class_name => "User"

end
