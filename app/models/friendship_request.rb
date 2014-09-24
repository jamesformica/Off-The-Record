class FriendshipRequest < ActiveRecord::Base

	belongs_to :to_user, :class_name => "User"
	belongs_to :from_user, :class_name => "User"

	#validates :to_user_id, uniqueness: { scope: :from_user_id, message: "already sent request"}
	validates :to_user_id, presence: true
	validates :from_user_id, presence: true

	validates_with FriendshipRequestValidator
end
