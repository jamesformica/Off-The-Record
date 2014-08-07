class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :username
  has_many :friendship_requests
  has_many :friendships
end
