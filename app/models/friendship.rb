class Friendship < ActiveRecord::Base
	belongs_to :user
	belongs_to :friend, :class_name => "User"

	validates :user_id, uniqueness: { scope: :friend_id, message: "already friends"}
	validates :user_id, presence: true
	validates :friend_id, presence: true
	
end
