class AddFavouriteColourToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :favourite_colour, :string, :default => "#575757"
  end
end
