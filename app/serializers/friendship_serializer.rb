class FriendshipSerializer < ActiveModel::Serializer
	attributes :id, :friend_id, :friend_username, :highlight_colour

  def friend_username
  	object.friend.username
  end


  def highlight_colour
  	colours = ["#4ECDC4", "#C7F464", "#FF6B6B", "#F67280", "#C06C84", "#0ABFBC", "#F56991", "#FF9F80", "#D1F2A5"]
  	firstLetter = friend_username[0]
  	return colours[firstLetter.ord % (colours.length - 1)]
  end

end