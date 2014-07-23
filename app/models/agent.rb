class Agent < ActiveRecord::Base

	has_secure_password

	before_save { self.email = email.downcase }
	before_create :create_remember_token

	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i



	validates :name, presence: true, length: { maximum: 50 }
	validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
	validates :username, presence: true
	validates :password, length: { minimum: 6 }

	
	def Agent.new_remember_token
		SecureRandom.urlsafe_base64
	end

	def Agent.digest(token)
		Digest::SHA1.hexdigest(token.to_s)
	end

	private

		def create_remember_token
			self.remember_token = Agent.digest(Agent.new_remember_token)
		end


end
