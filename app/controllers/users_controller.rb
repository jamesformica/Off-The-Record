class UsersController < ApplicationController

	before_action :redirect_if_signed_in, except: :show
	before_action :redirect_if_signed_out, except: :new

	def show
		
	end

	def new
		
	end

end
