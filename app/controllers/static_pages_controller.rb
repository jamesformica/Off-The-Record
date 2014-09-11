class StaticPagesController < ApplicationController

	#before_action :redirect_to_profile, except: :profile

	def index
	end

	def test
	end

	def profile
	end

	private
	def redirect_to_profile
		if signed_in?
			redirect_to profile_path
		end
	end

end
