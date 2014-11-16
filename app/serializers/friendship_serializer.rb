class FriendshipSerializer < ActiveModel::Serializer
	attributes :id, :friend_id, :friend_username, :highlight_colour

  def friend_username
  	object.friend.username
  end


  def highlight_colour
  	colours = ["#51c3f5", "#f59b1c", "#17efb1", "#ff8780", "#ff79c0", "#745eb0", "#efcc00", "#ef588c", "#65ff7e"]
  	firstLetter = friend_username[0]
  	return colours[firstLetter.ord % (colours.length - 1)]
  end

end
