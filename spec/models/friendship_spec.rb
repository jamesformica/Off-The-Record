require 'spec_helper'

describe Friendship do
	
	before { @friendship = Friendship.new(user_id: 1, friend_id: 2) }
	subject { @friendship }

	it { should respond_to(:user_id) }
	it { should respond_to(:friend_id) }

	it { should be_valid }

	describe "when user_id is not present" do
		before { @friendship.user_id = nil }
		it { should_not be_valid }
	end

	describe "when friend_id is not present" do
		before { @friendship.friend_id = nil }
		it { should_not be_valid }
	end

	describe "when friendship is added twice" do
		before do
			friendship_with_same_ids = @friendship.dup
			friendship_with_same_ids.save
		end
		it { should_not be_valid }
	end

end
