class RenameUserQuestionsToUserQuestion < ActiveRecord::Migration
  def change
  		rename_table :user_questions, :user_question
  end
end
