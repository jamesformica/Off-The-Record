class StaticPagesController < ApplicationController

	before_action :redirect_to_record, except: :record

	def index
	end

	def signup
	end

	def record
	end

	private
	def redirect_to_record
		if signed_in?
			redirect_to record_path
		end
	end

end
