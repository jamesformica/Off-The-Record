class RenameAgentsToUsers < ActiveRecord::Migration
  def change
  	rename_table :agents, :users
  end
end
