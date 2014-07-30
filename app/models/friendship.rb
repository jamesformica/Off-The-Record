class Friendship < ActiveRecord::Base
	belongs_to :agent
	belongs_to :friend, :class_name => "Agent"
end
