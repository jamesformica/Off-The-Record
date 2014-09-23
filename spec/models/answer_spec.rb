require 'spec_helper'

describe Answer do

	before { @answer = Answer.new(answer: "This is a test", user_id: 1, question_id: 2) }

	subject { @answer }

	it { should respond_to(:answer) }
	it { should respond_to(:user_id) }
	it { should respond_to(:question_id) }

	it { should be_valid }

	describe "when answer is not present" do
		before { @answer.answer = "" }
		it { should_not be_valid }
	end

	describe "when answer has 1 character" do
		before { @answer.answer = "a" }
		it {should be_valid }
	end

	describe "when user_id is not present" do
		before { @answer.user_id = "" }
		it { should_not be_valid }
	end

	describe "when question_id is not present" do
		before { @answer.question_id = "" }
		it { should_not be_valid }
	end

end
