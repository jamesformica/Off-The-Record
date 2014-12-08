class UserSerializer < ActiveModel::Serializer
	include UserHelper
	
	attributes :id, :name, :email, :username, :favourite_colour
	has_many :friendship_requests
	has_many :friendships
	has_many :questions
	
end
