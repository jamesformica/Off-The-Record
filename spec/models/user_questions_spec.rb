require 'spec_helper'

describe UserQuestion do

	before { @userQuestion = UserQuestion.new(user_id: 1, question_id: 2) }

	subject { @userQuestion }

	it { should respond_to(:user_id) }
	it { should respond_to(:question_id) }

	it { should be_valid }

	describe "when user_id is not present" do
		before { @userQuestion.user_id = "" }
		it { should_not be_valid }
	end

	describe "when question_id is not present" do
		before { @userQuestion.question_id = "" }
		it { should_not be_valid }
	end

end
