class UserSerializer < ActiveModel::Serializer
	include UserHelper
	
	attributes :id, :name, :email, :username, :favourite_colour
	has_many :friendship_requests
	has_many :friendships
	has_many :questions

	def favourite_colour
		AccentColour.get_colour_from_name(object.username)
	end
end
