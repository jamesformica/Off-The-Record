require 'spec_helper'

describe Friendship do

	before do
		@user1 = User.create(name: "user1", email: "u1@example.com", username: "user1", password: "password", password_confirmation: "password")
		@user2 = User.create(name: "user2", email: "u2@example.com", username: "user2", password: "password", password_confirmation: "password")
		@friendship = Friendship.new(user_id: @user1.id, friend_id: @user2.id)
	end
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
