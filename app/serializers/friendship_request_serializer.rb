class FriendshipRequestSerializer < ActiveModel::Serializer
  attributes :id, :from_user_id, :from_username

  def from_username
  	object.from_user.username unless !object.valid?
  end
end
