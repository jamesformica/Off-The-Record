class AddViewedToAnswers < ActiveRecord::Migration
  def change
  	add_column :answers, :viewed, :boolean, :default => false
  end
end
