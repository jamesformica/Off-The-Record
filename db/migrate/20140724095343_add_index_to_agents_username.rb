class AddIndexToAgentsUsername < ActiveRecord::Migration
  def change
  	add_index :agents, :username, unique: true
  end
end
