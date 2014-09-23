require 'spec_helper'

describe Question do

	before { @question = Question.new(question: "Is this a test", owner_id: 1) }

	subject { @question }

	it { should respond_to(:question) }
	it { should respond_to(:owner_id) }

	it { should be_valid }

	describe "when question is not present" do
		before { @question.question = "" }
		it { should_not be_valid }
	end

	describe "when question has 1 character" do
		before { @question.question = "a" }
		it {should be_valid }
	end

	describe "when owner_id is not present" do
		before { @question.owner_id = "" }
		it { should_not be_valid }
	end

end
