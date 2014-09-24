class User < ActiveRecord::Base

	has_many :answers
	has_many :user_questions
	has_many :questions, :through => :user_questions

	has_many :friendships
	has_many :friendship_requests, :foreign_key => 'to_user_id'

	has_secure_password

	before_save { self.email = email.downcase }
	before_create :create_remember_token

	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

	validates :name, presence: true, length: { maximum: 50 }
	validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
	validates :username, presence: true, uniqueness: { case_sensitive: false }
	validates :password, length: { minimum: 6 }, on: :create

	
	def User.new_remember_token
		SecureRandom.urlsafe_base64
	end

	def User.digest(token)
		Digest::SHA1.hexdigest(token.to_s)
	end

	private

		def create_remember_token
			self.remember_token = User.digest(User.new_remember_token)
		end


end
