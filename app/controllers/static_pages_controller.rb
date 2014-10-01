class StaticPagesController < ApplicationController

	before_action :redirect_if_signed_out, except: :index
	before_action :redirect_if_signed_in, except: :profile

	def index
	end

	def profile
	end



end
