class RenameUserQuestionToUserQuestions < ActiveRecord::Migration
  def change
  	rename_table :user_question, :user_questions
  end
end
