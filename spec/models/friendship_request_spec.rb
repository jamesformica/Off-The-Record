require 'spec_helper'

describe FriendshipRequest do

	before do 
		@user1 = User.create(name: "user1", email: "u1@example.com", username: "user1", password: "password", password_confirmation: "password")
		@user2 = User.create(name: "user2", email: "u2@example.com", username: "user2", password: "password", password_confirmation: "password")
		@friendship_req = FriendshipRequest.new(from_user_id: @user1.id, to_user_id: @user2.id) 
	end
	subject { @friendship_req }

	it { should respond_to(:to_user_id) }
	it { should respond_to(:from_user_id) }

	it { should be_valid }

	describe "when to_user_id is not present" do
		before { @friendship_req.to_user_id = nil }
		it { should_not be_valid }
	end

	describe "when from_user_id is not present" do
		before { @friendship_req.from_user_id = nil }
		it { should_not be_valid }
	end

	describe "when friendship request is added twice" do
		before do
			friendship_with_same_ids = @friendship_req.dup
			friendship_with_same_ids.save
		end
		it { should_not be_valid }
	end

end
