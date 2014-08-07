class FriendshipSerializer < ActiveModel::Serializer
	attributes :id, :friend_id, :friend_username

  def friend_username
  	object.friend.username
  end
end
