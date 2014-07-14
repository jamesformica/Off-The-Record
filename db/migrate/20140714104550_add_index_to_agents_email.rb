class AddIndexToAgentsEmail < ActiveRecord::Migration
  def change
  	add_index :agents, :email, unique: true
  end
end
