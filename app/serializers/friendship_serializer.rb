class FriendshipSerializer < ActiveModel::Serializer
	include UserHelper
	
	attributes :id, :friend_id, :friend_username, :highlight_colour

	def friend_username
		object.friend.username
	end


	def highlight_colour
		AccentColour.get_colour_from_name(friend_username)
	end

end