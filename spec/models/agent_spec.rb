require 'spec_helper'

describe Agent do

	before { @agent = Agent.new(name: "Samule Pezza", email: "sam@example.com", username: "pezza123", password: "foobar", password_confirmation: "foobar") }

	subject { @agent }

	it { should respond_to(:name) }
	it { should respond_to(:email) }
	it { should respond_to(:username) }
	it { should respond_to(:password_digest) }
	it { should respond_to(:password) }
	it { should respond_to(:password_confirmation) }
	it { should respond_to(:authenticate) }

	it { should be_valid }

	describe "when name is not present" do
		before { @agent.name = "" }
		it { should_not be_valid }
	end

	describe "when email is not present" do
		before { @agent.email = "" }
		it { should_not be_valid }
	end

	describe "when username is not present" do
		before { @agent.username = "" }
		it { should_not be_valid }
	end

	describe "when name is too long" do
		before { @agent.name = "a" * 51 }
		it {should_not be_valid }
	end

	describe "when email format is invalid" do
		it "should be invalid" do
			addresses = %w[user@foo,com user_at_foo.org example.user@foo.
				foo@bar_baz.com foo@bar+baz.com]
				addresses.each do |invalid_address|
					@agent.email = invalid_address
					expect(@agent).not_to be_valid
				end
			end
		end

		describe "when email format is valid" do
			it "should be valid" do
				addresses = %w[user@foo.COM A_US-ER@f.b.org frst.lst@foo.jp a+b@baz.cn]
				addresses.each do |valid_address|
					@agent.email = valid_address
					expect(@agent).to be_valid
				end
			end
		end

		describe "when email address is already taken" do
			before do
				user_with_same_email = @agent.dup
				user_with_same_email.save
			end

			it { should_not be_valid }
		end

		describe "when email address is already taken" do
			before do
				user_with_same_email = @agent.dup
				user_with_same_email.email = @agent.email.upcase
				user_with_same_email.save
			end

			it { should_not be_valid }
		end

		describe "when password is not present" do
			before do
				@agent = Agent.new(name: "Example User", email: "user@example.com",
					password: " ", password_confirmation: " ")
			end
			it { should_not be_valid }
		end

		describe "when password doesn't match confirmation" do
			before { @agent.password_confirmation = "mismatch" }
			it { should_not be_valid }
		end


		describe "return value of authenticate method" do
			before { @agent.save }
			let(:found_user) { Agent.find_by(email: @agent.email) }

			describe "with valid password" do
				it { should eq found_user.authenticate(@agent.password) }
			end

			describe "with invalid password" do
				let(:user_for_invalid_password) { found_user.authenticate("invalid") }

				it { should_not eq user_for_invalid_password }
				specify { expect(user_for_invalid_password).to be_false }
			end
		end

		describe "with a password that's too short" do
			before { @agent.password = @agent.password_confirmation = "a" * 5 }
			it { should be_invalid }
		end

	end
